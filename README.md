### Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Acknowledgements](#Acknowledgements)
- [Change Log](#change-log)
- [License (MIT)](#license-(mit))

## Introduction

Tweet Tray is a small application which allows you to tweet from your desktop system tray or status bar, without any further distractions. The core technology used consists of Electron, React + Redux and Styled Components. All transpiled from ES6 Javascript.

## Installation

1. Clone the Tweet Tray repository from Github to your local machine.
```
git clone https://github.com/jonathontoon/tweet-tray.git
```

2. To run Tweet Tray locally you will need to first install [npm](https://www.npmjs.com/get-npm) and [yarn](https://yarnpkg.com/lang/en/docs/install/) package managers.

3. Setup the applications' dependencies by navigating to the `tweet-tray` directory and run `yarn install`.

4. After everything has been installed simply call `yarn dev` to run the development build. To run the production build you can call `yarn prestart` followed by `yarn start`.

## Development

For all new features or bug fixes simply submit a pull request directly into the `develop` branch. Once your pull request has been successfully rebased and tested a separate request can then be made to merge into `master`.

## Deployment

To create an installable build simply call `yarn package`, which will create an executable based on your current operating system. If you want to debug something in a packaged build you can call `DEBUG_PROD=true yarn package`.

## Acknowledgements

This project is based off [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate), all methodloligies still apply, except for the removal of Flow and SASS.

## Change Log

### v1.0.0b
The beginning and initial release of Tweet Tray! 🎉

Included in this release are the basics to use the app. Look forward to more updates soon!
- Set up basic framework for Electron and React
- Created wrapper for using Twitter OAuth 1.0 API with Electron
- Created React application, components and UI, using Redux and Styled Components
- Basic ability to add a single image, or GIF to a tweet.
- Notifications which create alerts whenever a tweet has sent successfully or any type of error has occured.
- Basic smoke testing for Windows 10 and OSX High Sierra.

## License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
