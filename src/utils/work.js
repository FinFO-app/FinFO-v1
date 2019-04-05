/*

NEWS SHORTING AND LAYOUT

- Select all news in 24 of uploading time (creationTime)
- Short according to priority (high to low)
- Then Short according to creation time (new ones to old ones)
- finally layout them according to layout

 */

/*

REQUEST TO MAKE

- load TODAY
- request all other tabs and there layout
- request tabs accordingly

 */

/*

REFRESH NEWS

- load the CURRENT TAB
- load TODAY
- load other tabs accordingly

 */

let EVERYTHING = {};

const NEWS = {
    "title": "",
    "detail": "",
    "creationTime": "",
    "source": "",
    ...EVERYTHING
};

const TODAY = {
    "detailCard": [],
    "cardList": [],
    "list": []
};

const LAYUOT = {
    "detailCard": 1,
    "cardList": 3,
    "list": 10
};
