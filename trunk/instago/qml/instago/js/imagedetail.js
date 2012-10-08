// *************************************************** //
// Imagedetail Script
//
// This script is used to load, format and show image
// related data.
// Its used by the ImageDetailPage.
// *************************************************** //


// include other scripts used here
Qt.include("instagramkeys.js");
Qt.include("authenticationhandler.js");
Qt.include("helpermethods.js");
Qt.include("networkhandler.js");

// general network handler that acts upon the http request
var network = new NetworkHandler();

// general authentication handler that provides user authentication methods
var auth = new AuthenticationHandler();


// load an image with a given Instagram media id
// the image data will be used to fill the ImageDetailPage
// note that the image data is different for an authenticated
// user vs an unknown one
function loadImage(imageId)
{
    // console.log("Loading image " + imageId);

    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
            {
                // this handles the result for each ready state
                var jsonObject = network.handleHttpResult(req);

                // jsonObject contains either false or the http result as object
                if (jsonObject)
                {
                    // get image object
                    var imageCache = new Array();
                    imageCache = getImageDataFromObject(jsonObject.data);

                    // apply image object to page components
                    imageData.originalImage = imageCache["originalimage"];
                    imageData.imageId = imageCache["imageid"];
                    imageData.username = imageCache["username"];
                    imageData.profilePicture = imageCache["profilepicture"];
                    imageData.userId = imageCache["userid"];
                    imageData.likes = imageCache["likes"] + " people liked this";
                    imageData.linkToInstagram = imageCache["linktoinstagram"];
                    imageData.caption = imageCache["caption"];
                    imageData.createdTime = imageCache["createdtime"];

                    // if they don't have an Instagram page, the share button needs to be deactivated
                    if (imageCache["linktoinstagram"] === "")
                    {
                        iconShare.visible = false;
                        iconShareDeactivated.visible = true;
                    }

                    // check if user has already liked the image and set icons accordingly
                    if (imageCache["userhasliked"])
                    {
                        iconLiked.visible = true;
                    }
                    else
                    {
                        iconUnliked.visible = true;
                    }

                    loadingIndicator.running = false;
                    loadingIndicator.visible = false;
                    contentFlickableContainer.visible = true;

                    // console.log("Done loading image");
                }
                else
                {
                    // either the request is not done yet or an error occured
                    // check for both and act accordingly
                    if ( (network.requestIsFinished) && (network.errorData['code'] != null) )
                    {
                        loadingIndicator.running = false;
                        loadingIndicator.visible = false;

                        errorMessage.showErrorMessage({
                                                          "d_code":network.errorData['code'],
                                                          "d_error_type":network.errorData['error_type'],
                                                          "d_error_message":network.errorData['error_message']
                                                      });
                    }
                }
            }

    // only authenticated users have user_has_liked nodes in their response data
    // thus the request should be done with the access token whenever possible
    var url = "";
    if (auth.isAuthenticated())
    {
        var instagramUserdata = auth.getStoredInstagramData();
        url = "https://api.instagram.com/v1/media/" + imageId + "/?access_token=" + instagramUserdata["access_token"];
    }
    else
    {
        url = "https://api.instagram.com/v1/media/" + imageId + "/?client_id=" + instagramClientId;
    }

    req.open("GET", url, true);
    req.send();
}
