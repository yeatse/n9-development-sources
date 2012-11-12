// *************************************************** //
// Search Script
//
// This script handles the search for users and hashtags.
// It's used by the SearchPage.
// *************************************************** //


// include other scripts used here
Qt.include("instagramkeys.js");
Qt.include("helpermethods.js");
Qt.include("authenticationhandler.js");
Qt.include("networkhandler.js");


// this is the global storage for the pagination id
var lastPaginationId = "";


// search for given users
// the return data is a list of found users as user list
function searchUser(query)
{
    // console.log("Searching for user: " + query);

    searchUserResults.visible = false;
    imageGallery.visible = false;
    searchNoResultsFound.visible = false;
    errorMessage.visible = false;

    loadingIndicator.running = true;
    loadingIndicator.visible = true;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
            {
                // this handles the result for each ready state
                var jsonObject = network.handleHttpResult(req);

                // jsonObject contains either false or the http result as object
                if (jsonObject)
                {
                    searchUserResults.clearList();

                    var userCache = new Array();
                    for ( var index in jsonObject.data )
                    {
                        userCache = [];

                        userCache["username"] = jsonObject.data[index].username;
                        userCache["fullname"] = jsonObject.data[index].full_name;
                        if (userCache["fullname"] === "") userCache["fullname"] = userCache["username"];
                        userCache["profilepicture"] = jsonObject.data[index].profile_picture;
                        userCache["userid"] = jsonObject.data[index].id;
                        userCache["bio"] = jsonObject.data[index].bio;

                        searchUserResults.addToList({
                                                           "d_username": userCache["username"],
                                                           "d_fullname": userCache["fullname"],
                                                           "d_profilepicture": userCache["profilepicture"],
                                                           "d_userid": userCache["userid"],
                                                           "d_index": index
                                                       });

                        // console.log("Appended list with ID: " + imageCache["imageId"] + " in index: " + index);
                    }

                    // check if list is empty and show message
                    if (searchUserResults.numberOfItems < 1)
                    {
                        searchNoResultsFound.visible = true;
                    }

                    loadingIndicator.running = false;
                    loadingIndicator.visible = false;

                    imageGallery.visible = false;
                    searchUserResults.visible = true;
                    searchUserResults.focus = true;

                    // console.log("Done searching users");
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

    var instagramUserdata = auth.getStoredInstagramData();
    var url = instagramkeys.instagramAPIUrl + "/v1/users/search?q=" + query + "&access_token=" + instagramUserdata["access_token"];

    console.log(url);

    req.open("GET", url, true);
    req.send();
}


// search for given tags
// the return data is a list of found tags
function loadHashtagImages(hashtag, paginationId)
{
    console.log("Searching for hashtag: " + hashtag);

    // check if the current pagination id is the same as the last one
    // this is the case if all images habe been loaded and there are no more
    if ( (paginationId !== 0) && (paginationId === lastPaginationId) )
    {
        // console.log("Last pagination id matches this one: " + paginationId + " - returning");
        return;
    }

    // check if this is a new call or loading more images
    if (paginationId === 0)
    {
        searchUserResults.visible = false;
        imageGallery.visible = false;
        searchNoResultsFound.visible = false;
        errorMessage.visible = false;

        loadingIndicator.running = true;
        loadingIndicator.visible = true;
    }
    else
    {
        notification.useTimer = false;
        notification.text = "Loading more images..";
        notification.show();
    }

    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
            {
                // this handles the result for each ready state
                var jsonObject = network.handleHttpResult(req);

                // jsonObject contains either false or the http result as object
                if (jsonObject)
                {
                    if (paginationId === 0)
                    {
                        imageGallery.clearGallery();
                    }

                    var imageCache = new Array();
                    for ( var index in jsonObject.data )
                    {
                        if (index <= 17)
                        {
                            // get image object
                            imageCache = getImageDataFromObject(jsonObject.data[index]);
                            // cacheImage(imageCache);

                            // add image object to gallery list
                            imageGallery.addToGallery({
                                                        "url":imageCache["thumbnail"],
                                                        "index":imageCache["imageid"]
                                                    });

                            // console.log("Appended list with URL: " + imageCache["thumbnail"] + " and ID: " + imageCache["imageid"]);
                        }
                    }


                    // check if list is empty and show message
                    if (imageGallery.numberOfItems < 1)
                    {
                        searchNoResultsFound.visible = true;
                    }

                    // check if the page has a following page in the pagination list
                    // if so then remember it in the gallery component
                    if (jsonObject.pagination.next_max_tag_id != null)
                    {
                        imageGallery.paginationNextMaxId = jsonObject.pagination.next_max_tag_id;
                    }

                    if (paginationId === 0)
                    {
                        // initial loading
                        loadingIndicator.running = false;
                        loadingIndicator.visible = false;

                        searchUserResults.visible = false;
                        imageGallery.visible = true;
                        imageGallery.focus = true;
                    }
                    else
                    {
                        // loading additional images
                        notification.hide();
                        notification.useTimer = true;
                    }

                    console.log("Done searching for hashtag");
                }
                else
                {
                    // either the request is not done yet or an error occured
                    // check for both and act accordingly
                    if ( (network.requestIsFinished) && (network.errorData['code'] != null) )
                    {
                        console.log("error found: " + network.errorData['error_message']);
                        loadingIndicator.running = false;
                        loadingIndicator.visible = false;

                        errorMessage.showErrorMessage({
                                                          "d_code":network.errorData['code'],
                                                          "d_error_type":network.errorData['error_type'],
                                                          "d_error_message":network.errorData['error_message']
                                                      });
                        network.clearErrors();
                    }
                }
            }

    var instagramUserdata = auth.getStoredInstagramData();
    var url = instagramkeys.instagramAPIUrl + "/v1/tags/" + hashtag + "/media/recent?&access_token=" + instagramUserdata["access_token"];
    if (paginationId !== 0)
    {
        url += "&max_id=" + paginationId;
        lastPaginationId = paginationId;
    }

    console.log(url);

    req.open("GET", url, true);
    req.send();
}
