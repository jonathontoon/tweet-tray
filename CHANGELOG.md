# Change Log

## [v1.1.5](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.1.5)

- Fixed a Japanese translation for 'report_issue_action' (Thanks to @hashedhyphen!)

## [v1.1.4](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.1.4)

- Simplify position logic on Windows.

## [v1.1.3](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.1.3)

- Add CLI option for running the executable with a proxy (#57)
- Add fix for Linux platforms where clicking menubar icon wouldnt display window (#172)

## [v1.1.2](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.1.2)

- Set English to be the default locale (#167)

## [v1.1.1](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.1.1)

A few quick improvements

- Fix a null error for window positioning at specific screen scales (#156)
- Added support for Spanish (#158) (Thanks @nil!)

## [v1.1.0](https://github.com/jonathontoon/tweet-tray/releases/tag/v1.1.0)

It's been awhile since our last release, but hopefully this one is well worth it. Along with a number of small features and improvements we now have support for 7 languages!

- Fix global shortcut issue interfering with other applications (#121)
- Add option to launch app on OS launch (#111)
- Fix Linux bug for window positioning (#107)
- Separate out composer window logic (#105)
- Use profile color from API to tint Tweet Tray (#102)
- Fix window positioning on OSX and Windows (#90, #82)
- Add support for 7 languages (#30) (Thanks to @riotherio, @aauldy, @harleo, @juanbuis and Shiping Toohey)
- Add tests for React components (#9)
- Redesigned Settings view
- Added current application version number to Settings view
- Add CircleCI and Github badges to README.md
- Added support for Tweet Tray to [Homebrew Cask](https://caskroom.github.io/) (#86) (Thanks @riotherio!)

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
