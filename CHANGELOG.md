# Change Log

## [v1.0.3](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.0.3)

Includes a number of bug fixes, keyboard shortcuts and a great new icon thanks to @riotherio.

- When Settings overlay is clicked dismiss the component.
- Handle error edge case when sending tweet fails.
- When composer window is shown focus on the textarea.
- Add hotkeys (Cmd|Ctrl+Alt+Shit+T) for hide and show the main window. 
- Adjust button padding for onboarding pages.
- Main window wont blur and hide after closing image dialog.
- Prevent drag and drop events to stop Electron redirect.
- Instead of posting a notification use dialog for image attachment errors.
- Add support for Cmd|Ctrl+Enter to send tweet.
- Prevent multiple OAuth windows.
- Work on a new logo to differentiate from Twitter's core branding

## [v1.0.2](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.0.2)

A few clean up bugs and tweaks.

### Changes

- Fixed a typo in the right click menu.
- Added extra fix for copy / paste keyboard shortcuts.
- Added improved app icons thanks to @riotherio!

## [v1.0.1](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.0.1)

Thanks for downloading the previous release! The feedback so far for Tweet Tray has been overwhelming.
I appreciate the support and hope we can begin to build up a great open source project.

### Changes

- Added fix for input fields within the electron windows where right-click menus as well as copy and paste were not working. 

## [v1.0.0](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.0.0b)

The beginning and initial release of Tweet Tray! 🎉

Included in this release are the basics to use the app. Look forward to more updates soon!

### Changes

- Set up basic framework for Electron and React.
- Created wrapper for using Twitter OAuth 1.0 API with Electron.
- Created React application, components and UI, using Redux and Styled Components.
- Basic ability to add a single image, or GIF to a tweet.
- Settings component with the ability to enable Night Mode, Log Out and Quit.
- Notifications which create alerts whenever a tweet has sent successfully or any type of error has occurred.
- Basic smoke testing for Windows 10 and OSX High Sierra.
