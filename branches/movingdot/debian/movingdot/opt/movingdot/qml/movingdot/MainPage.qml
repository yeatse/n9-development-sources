import QtQuick 1.1
import QtMobility.sensors 1.1
import com.nokia.meego 1.0
import "js/MainLogic.js" as MainLogic

Page {
    id: pgMainPage
    tools: commonTools
    orientationLock: PageOrientation.LockLandscape

    property bool activeGame: false
    property int heartbeatInterval: 100

    Timer {
        interval: heartbeatInterval;
        running: true;
        repeat: true
        onTriggered: MainLogic.move();
    }

    Accelerometer {
        id: accData
        active: true

        onReadingChanged: {
            MainLogic.updatePosition( reading );
        }
    }

    Rectangle {
        id: rctDot
        width: 20
        height: 20
        color: "red"
        border.color: "black"
        border.width: 5
        radius: 20
        x: 425
        y: 240
    }

}
