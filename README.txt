
README File for the ActivateTIM Script
======================================

This script allows you to activate your INSIKA smart card ("TIM"). It is 
written for the SmartCardShell3 (SCSH3), see http://www.openscdp.org/scsh3/ . 
A smart card reader has to be installed on your system.  



Installation of the SCSH3
-------------------------

Get started by downloading the version 3.7.1062 of the SmartCardShell3 
(http://www.openscdp.org/scsh3/download.html). Follow the installation 
instructions: http://www.openscdp.org/scsh3/installation.html

Start the SCSH3. (If you downloaded the ZIP-Archive make sure you start 
the GUI-version, on Windows "scsh3gui.exe" or on Linux "sh scsh3gui" ).

You are asked to select the workspace on startup. Remember you selection, 
as the logging files are put in here.

Check the installation: insert a INSIKA smart card into the reader and 
enter "r" for reset: 

>r
0000  3B F2 18 00 02 C1 0A 31 FE 58 C8 08 74           ;......1.X..t

TS  : 3B  Direct logic
TO  : F2  K    =     2 byte [historical characters]
TA1 : 18  Fi/f =   372/ 5   [clock rate conversion factor / max. frequency (MHz)]
          Di   =    12      [bit rate conversion factor]
TB1 : 00  pa   =     4 %    [programming voltage accurancy]
          I    =    25 mA   [maximum current]
          P    =     0 V    [programming voltage]
TC1 : 02  N    =     2 etu  [extra guardtime]
TD1 : C1  T    =   T=1      [protocol type]
TC2 : 0A  W    =    10      [waiting time adjustment factor]
TD2 : 31  T    =   T=1      [protocol type]
TA3 : FE  IFSC =   254      [information field size]
TB3 : 58  CWT  =   267 etu  [character waiting time]
          BWT  = 30731 etu  [block waiting time]
C808 È.

>

You must see the ATR of the card. If you do not see something equal, please 
check the SCSH3 web site: http://www.openscdp.org/scsh3/ .



Download of the Script "ActivateTIM.js"
---------------------------------------

Get the ActivateTIM script from the github site: https://github.com/insika/ActivateTIM 
Chose "Downloads" and "Download as zip". Unzip the Files to the workspace 
directory of the SCSH3.



Activation of the INSIKA Smart Card
-----------------------------------

Now insert the INSIKA smart card that has to be activated. Chose "File | Run Script" 
from the file menu and open "ActivateTIM.js".


>load("/home/jw/workspace/ActivateTIM/ActivateTIM.js");
***** TIM Status *****
LifeCycle        :  TIM_PERSONALISED


Now a new window opens "TIM Activate: Enter Transport PIN".
Enter the 6 digits of the Transport PIN.


***** Report TIM Activate *****
reportReq         : ...
reportResp        : ...
Writing 20120918151823

***** TIM Status *****
LifeCycle        :  TIM_ACTIVATED
>


Please keep the log file named e.g. "20120918151823" which you'll find in your 
workspace directory.

The INSIKA smart card has been activated. 



Contact
-------
In case of problems concerning the script, please contact us at insika@ptb.de  
