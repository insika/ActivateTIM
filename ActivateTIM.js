
/*
	Copyright (c) Physikalisch-Technische Bundesanstalt (PTB) 2012. All rights reserved.
	Abbestr. 2-12, 10587 Berlin, Germany, insika@ptb.de                                    
*/

var lifeCycle = { 	
	0: "undefined", 
	1: "TIM_INITIALISED", 
	2: "TIM_PERSONALISED", 
	3: "TIM_ACTIVATED", 
	4: "TIM_DEACTIVATED" };
	
// init card
c   = new Card();
atr = c.reset( Card.RESET_COLD );

function writeToDisk(name, content) {
	var filename = GPSystem.mapFilename(name, GPSystem.CWD);
	print("Writing " + filename);
	var file = new java.io.FileOutputStream(filename);
	file.write(content);
	file.close();
}

function TIM_Status(c) {
    print ("***** TIM Status *****");
    resp = c.sendApdu(0x00, 0xCA, 0x01, 0xF0,  0x00, [0x9000]);
    RespTLV = new TLVList (resp, TLV.EMV);
	lifeCycleNo = RespTLV.find(0xC0).getValue().toUnsigned();
    print("LifeCycle        : ", lifeCycle[lifeCycleNo]);
	return( lifeCycleNo ); 
}  	

function TIM_ReportTIMActivate(c, timDate, timTime, timTransportPin ) {
    print ("");
    print ("***** Report TIM Activate *****");
    x = new ByteString("", ASCII);
    x = x.concat (new TLV(0xCD, new ByteString(timDate, HEX), TLV.EMV).getTLV());
    x = x.concat (new TLV(0xCE, new ByteString(timTime, HEX), TLV.EMV).getTLV());
    x = x.concat (new TLV(0xC3, new ByteString(timTransportPin, ASCII), TLV.EMV).getTLV());
    print ("reportReq         : ", x.toBase64(true).toString(ASCII));	
	
    resp = c.sendApdu(0x80,0x42,0x04,0x00,x,0,[0x9000]);
    RespTLV = new TLVList (resp, TLV.EMV);
    print ("reportResp        : ", RespTLV.toByteString().toBase64(true).toString(ASCII));
    x = x.concat (resp);	  
	return(x)
}

// select TIM application by AID
c.sendApdu( 0x00, 0xa4, 0x04, 0x0c, new ByteString ("D27600014854494D",HEX),[0x9000]);

if ( TIM_Status(c) == 2 ) {
	timDate = GPSystem.dateTimeByteString().bytes(0, 4);
	timTime = GPSystem.dateTimeByteString().bytes(4, 2);
	var timTransportPin = Dialog.prompt("TIM Activate: Enter Transport PIN", "");
	assert( timTransportPin.length == 6 );
	data = TIM_ReportTIMActivate(c, timDate, timTime, timTransportPin );
	writeToDisk(GPSystem.dateTimeByteString().toString(HEX), data);
	TIM_Status(c);
}