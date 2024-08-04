function 初期設定 () {
    music.setBuiltInSpeakerEnabled(false)
    music.setVolume(40)
    freq = 770
    pins.setAudioPin(AnalogPin.P12)
    onA = 0
    onB = 0
    onDASH = 0
    onDOT = 0
    WPM = 23
    pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P2, PinPullMode.PullDown)
}
function doDOT2 () {
    for (let index = 0; index < 2; index++) {
        timer = control.millis()
        music.ringTone(freq)
        pins.digitalWritePin(DigitalPin.P16, 1)
        while (control.millis() - timer < 短点width) {
        	
        }
        music.stopAllSounds()
        pins.digitalWritePin(DigitalPin.P16, 0)
        while (control.millis() - timer < 短点width * 2) {
        	
        }
    }
    HHカウンタ = 0
}
function doDASH () {
    timer = control.millis()
    music.ringTone(freq)
    pins.digitalWritePin(DigitalPin.P2, 1)
    while (true) {
        if (control.millis() - timer > 短点width * 3) {
            break;
        }
        basic.pause(1)
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            onDOT = 1
        }
    }
    music.stopAllSounds()
    pins.digitalWritePin(DigitalPin.P2, 0)
    timer = control.millis()
    while (true) {
        if (control.millis() - timer > 短点width) {
            break;
        }
        basic.pause(1)
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            onDOT = 1
        }
    }
    onDASH = 0
}
function doDOT () {
    timer = control.millis()
    music.ringTone(freq)
    pins.digitalWritePin(DigitalPin.P2, 1)
    while (true) {
        if (control.millis() - timer > 短点width) {
            break;
        }
        basic.pause(1)
        if (pins.digitalReadPin(DigitalPin.P15) == 0) {
            onDASH = 1
        }
    }
    music.stopAllSounds()
    pins.digitalWritePin(DigitalPin.P2, 0)
    timer = control.millis()
    while (true) {
        if (control.millis() - timer > 短点width) {
            break;
        }
        basic.pause(1)
        if (pins.digitalReadPin(DigitalPin.P15) == 0) {
            onDASH = 1
        }
    }
    onDOT = 0
}
function 短点速度設定 () {
    短点width = 1200 / WPM
}
function main () {
    while (true) {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            onDOT = 1
        }
        if (pins.digitalReadPin(DigitalPin.P15) == 0) {
            onDASH = 1
        }
        if (onDOT == 1) {
            HHカウンタ += 1
            doDOT()
            if (HHカウンタ == 6) {
                doDOT2()
                HHカウンタ = 0
                while (pins.digitalReadPin(DigitalPin.P1) == 0) {
                	
                }
            }
        } else {
            HHカウンタ = 0
        }
        if (onDASH == 1) {
            doDASH()
        }
    }
}
let 短点width = 0
let timer = 0
let onDOT = 0
let onDASH = 0
let onB = 0
let onA = 0
let freq = 0
let HHカウンタ = 0
let WPM = 0
初期設定()
if (input.buttonIsPressed(Button.A)) {
    WPM = 20
    basic.showString("S")
}
if (input.buttonIsPressed(Button.B)) {
    WPM = 27
    basic.showString("H")
}
if (WPM == 23) {
    basic.showString("N")
}
HHカウンタ = 0
短点速度設定()
main()
