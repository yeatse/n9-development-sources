// import QtQuick 1.0 // to target S60 5th Edition or Maemo 5
import QtQuick 1.1
import com.nokia.meego 1.0
import "js/instago/globals.js" as Globals
import "js/instago/imagedetail.js" as PhotoDetailScript

Page {
    // use the detail view toolbar
    tools: detailViewToolbar

    // lock orientation to portrait mode
    orientationLock: PageOrientation.LockPortrait

    Component.onCompleted: {
        PhotoDetailScript.showDetailImageFromGallery(Globals.currentGalleryContent, Globals.currentGalleryIndex);
    }

    // standard header for the current page
    Header {
        id: pageHeader
        source: "img/top_header.png"
        text: qsTr("Photo")
    }


    // container for the user name and data
    Rectangle {
        id: userprofileContainer

        anchors {
            top: pageHeader.bottom;
            topMargin: 5;
            left: parent.left;
            right: parent.right;
        }

        color: "transparent"

        // full width, height is 80 px
        width: parent.width;
        height: 60


        // user profile picture (60x60)
        Rectangle {
            id: userprofilePictureContainer

            anchors {
                top: parent.top;
                left: parent.left;
                leftMargin: 5;
            }

            color: "#2B2B2B"

            width: 60
            height: 60

            // actual user image
            Image {
                id: userprofilePicture

                anchors.fill: parent
                smooth: true
            }
        }


        // username
        Text {
            id: userprofileUsername
            text: ""
            font.family: "Nokia Pure Text Light"
            font.pixelSize: 25

            anchors {
                top: parent.top;
                left: userprofilePictureContainer.right;
                leftMargin: 5;
                right: parent.right;
            }
            wrapMode: Text.Wrap
            height: 30
        }

        // creation time
        Text {
            id: userprofileCreatedtime
            text: ""
            font.family: "Nokia Pure Text"
            font.pixelSize: 18

            anchors {
                top: userprofileUsername.bottom;
                left: userprofilePictureContainer.right;
                leftMargin: 5;
                right: parent.right;
            }
            wrapMode: Text.Wrap
            height: 20
        }
    }

    // container for the detail image and its loader
    Rectangle {
        id: detailImageContainer

        anchors {
            top: userprofileContainer.bottom;
            topMargin: 5;
            left: parent.left;
            leftMargin: 5;
            right: parent.right;
            rightMargin: 5;
        }

        color: "#2B2B2B"

        // full width, height is 470 px (max width - border)
        width: parent.width;
        height: 470

        // show the loading indicator as long as the page is not ready
        BusyIndicator {
            id: loadingIndicator
            platformStyle: BusyIndicatorStyle { size: "large" }
            running:  true
            visible: true
            anchors.centerIn: parent
        }


        // the actual detail image
        // it's set to 480x480 px although the actual detail image size is 612x612
        Image {
            id: detailImage

            anchors.top: detailImageContainer.top

            width: parent.width
            height: 470
            smooth: true

            // invisible until loading is finished
            visible: false;

            // this listens to the loading progress
            // visibility properties are changed when finished
            onProgressChanged: {
                if (detailImage.progress == 1.0)
                {
                    loadingIndicator.running = false;
                    loadingIndicator.visible = false;
                    detailImage.visible = true;
                }
            }
        }
    }

    // container for the metadata
    Rectangle {
        id: metadataContainer

        anchors {
            top: detailImageContainer.bottom;
            topMargin: 5;
            left: parent.left;
            right: parent.right;
        }

        color: "transparent"

        // full width, height is 80 px
        width: parent.width;
        height: 100

        Text {
            id: metadataLikes
            text: ""
            font.family: "Nokia Pure Text Light"
            font.pixelSize: 25

            anchors {
                top: parent.top;
                left: parent.left;
                leftMargin: 5;
                right: parent.right;
            }
            wrapMode: Text.Wrap
            height: 25
        }
    }

    /*
        // image caption
        // this is pretty much unlimited length by instagram so it has to be cut
        Text {
            id: imageCaption
            text: ""
            color: "#ffffff"
            font.family: "Nokia Pure Text Light"
            font.pixelSize: 25

            width: 480

            anchors {
                top: detailImage.bottom
                topMargin: 10
                left: parent.left;
                right: parent.right;
                bottom: parent.bottom;
            }
            wrapMode: Text.Wrap
        }
    */

    // toolbar for the detail page
    ToolBarLayout {
        id: detailViewToolbar
        visible: false
        ToolIcon {
            iconId: "toolbar-back";
            onClicked: {
                pageStack.pop();
            }
        }
    }
}