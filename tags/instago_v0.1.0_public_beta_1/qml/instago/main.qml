import QtQuick 1.1
import com.nokia.meego 1.0

PageStackWindow {
    id: appWindow

    // initial page is the gallery of popular photos
    initialPage: popularPhotosPage

    // register the popular photo page
    PopularPhotosPage {
        id: popularPhotosPage
    }

}