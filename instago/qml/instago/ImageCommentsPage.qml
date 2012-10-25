// *************************************************** //
// Image Comments Page
//
// This page shows the list of comments for a given
// image.
// *************************************************** //

import QtQuick 1.1
import com.nokia.meego 1.1
import com.nokia.extras 1.1

import "js/globals.js" as Globals
import "js/comments.js" as Comments

Page {
    // use the detail view toolbar
    tools: profileToolbar

    // lock orientation to portrait mode
    orientationLock: PageOrientation.LockPortrait

    // the image id that the likes are pulled for
    // the property will be filled by the calling page
    property string imageId: "";

    Component.onCompleted: {
        Comments.getComments(imageId);
    }

    // standard header for the current page
    Header {
        id: pageHeader
        text: "Comments"
    }

    // standard notification area
    NotificationArea {
        id: notification

        visibilitytime: 1500

        anchors.bottom: parent.bottom
        anchors.bottomMargin: 10
    }


    // list of the followers
    // container is only visible if user is authenticated
    CommentList {
        id: imageComments;

        anchors {
            top: pageHeader.bottom
            topMargin: 10;
            left: parent.left;
            right: parent.right;
            bottom: imageCommentInput.top;
            bottomMargin: 5;
        }

        visible: false;
    }


    // comment entry field
    TextField {
        id: imageCommentInput

        anchors {
            left: parent.left;
            leftMargin: 10;
            right: parent.right;
            rightMargin: 10;
            bottom: parent.bottom;
            bottomMargin: 15;
        }

        onAccepted: {
            // console.log("Input received: " + imageCommentInput.text);
            Comments.addComment(imageId, imageCommentInput.text);

            imageCommentInput.text = "";
            imageCommentInput.platformCloseSoftwareInputPanel();
        }

        placeholderText: "Add Comment"
        text: ""
    }


    // text shown if no comment entered yet
    Text {
        id: imageCommentEmptyList

        anchors.centerIn: parent

        font.family: "Nokia Pure Text Light"
        font.pixelSize: 45
        wrapMode: Text.Wrap
        color: "darkgray"
        horizontalAlignment: Text.AlignHCenter

        visible: false;

        text: "No comments yet"
    }


    // show the loading indicator as long as the page is not ready
    BusyIndicator {
        id: loadingIndicator

        anchors.centerIn: parent
        platformStyle: BusyIndicatorStyle { size: "large" }

        running:  true
        visible: true
    }


    // error indicator that is shown when a network error occured
    ErrorMessage {
        id: errorMessage

        anchors {
            top: pageHeader.bottom;
            topMargin: 3;
            left: parent.left;
            right: parent.right;
            bottom: parent.bottom;
        }

        visible: false

        onErrorMessageClicked: {
            // console.log("Refresh clicked")
            errorMessage.visible = false;
            Comments.getComments(imageId);
        }
    }


    // toolbar for the detail page
    ToolBarLayout {
        id: profileToolbar

        // jump back to the detail image
        ToolIcon {
            iconId: "toolbar-back";
            onClicked: {
                pageStack.pop();
            }
        }
    }
}
