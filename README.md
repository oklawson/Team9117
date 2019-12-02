# Team9117
## Introduction
This GitHub contains the code base for teh Hero Card Discount Program Application as built for Mr. Ben Sweet and employees. The application is built with Ionic/Angular and is set up for the developers to plug in their own software and APIs.

## Installation Guide
### Prerequisites
<ul><li>Android 4.4+</li>
  <li>IOS 10+</li></ul>


### Dependencies
#### IONIC
<p><i><strong>Ionic CLI</strong></i>                     : 5.2.6 (/usr/local/lib/node_modules/ionic)
<p><i><strong>Ionic Framework</strong></i>                : @ionic/angular 4.10.0
<p><i><strong>@angular-devkit/build-angular</strong></i>   : 0.803.6
<p><i><strong>@angular-devkit/schematics</strong></i>     : 8.1.3
<p><i><strong>@angular/cli</strong></i>                    : 8.3.1
<p><i><strong>@ionic/angular-toolkit</strong></i>          : 2.0.0
<br>
  
#### CORDOVA
<p><i><strong>Cordova CLI</strong></i>         : 9.0.0 (cordova-lib@9.0.1)
<p><i><strong>Cordova Platforms</strong></i>   : android 8.1.0, browser 6.0.0
<p><i><strong>Cordova Plugins</strong></i>     : cordova-plugin-ionic-keyboard 2.2.0, cordova-plugin-ionic-webview 4.1.3, (and 14 other plugins)
<br>
  
#### UTILITY
<p><i><strong>cordova-res</strong></i>   : 0.8.1 
<p><i><strong>native-run</strong></i>    : 0.2.9
<br>
  
#### SYSTEM
<p><i><strong>NodeJS</strong></i>   : v10.16.3 (/usr/local/bin/node)
<p><i><strong>npm</strong></i>      : 6.13.1
<br>
  
### DOWNLOAD
Download our github repo via command window.  Git installation can be found here: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git.  
<br>
Our repo can be downloaded through the command line with the following command:
`git clone https://github.com/oklawson/Team9117.git`
<br>

### BUILD
No build has been completed for this application; this repository contains raw code only. At the time of incorporating their APIs, the client will be able to generate an APK (built application).
<br>
For serving the rough application to a browser for development purposes, use the following command: `ionic cordova run browser`
<br>
<strong><i>Build Instructions</i></strong>
<br>
To build for android refer to the documentation from ionic:
<ul><li>https://ionicframework.com/docs/publishing/play-store</li>
  <li>https://ionicframework.com/docs/installation/android</li></ul>
To build for IOS refer to the documentation from ionic:
<ul><li>https://ionicframework.com/docs/publishing/app-store</li>
  <li>https://ionicframework.com/docs/installation/ios</li></ul>

### INSTALLATION
Download ionic via https://ionicframework.com/docs/installation/cli.  This link will also instruct you to download Node.js and npm if you do not already have them installed.
<br>
Once you have our Github repo and ionic installed, you can have the program automatically install our project’s dependencies by navigating in the command line / terminal to the folder the project resides in <strong>(“../Team9117/HeroCard”)</strong> and typing `ionic repair`.
<br>

### RUNNING THE APPLICATION
Once that command is complete, you can run `ionic serve`  or  `ionic cordova run browser` to run a local server that allows you to explore a development build of the app.
<br>
When using `ionic serve`, any changes made in the project’s source code will be auto compiled to the local server.
<br>

### TROUBLESHOOTING
If there is an error regarding the favicon then run `ionic repair` in the terminal/command prompt.
<br>
We had a common issue where `ionic repair` wouldn’t download the stream.js package automatically.  If the app refuses to run after running the above command, try `npm install stream`.
<br>
If there are multiple issues after more development has been done, sometimes it is best to delete the Team9117 folder and redownload it from the git repo by using the command below in the terminal:
<br>
`git clone https://github.com/oklawson/Team9117.git`
<br>
</p>

## Release Notes
### NEW FEATURES
<ul>
  <li>Login & register functionality</li>
  <li>Create new account</li>
  <li>Pull QR code for user from database and display</li>
  <li>Search discount locations by typing</li>
  <li>Filter discount locations by type of location</li>
  <li>Discount location details page shows information regarding discount</li>
  <li>Reset password functionality</li>
  <li>Change email address functionality</li>
  <li>Logout functionality</li></ul>
  <br>

### BUG FIXES
<ol><li>Fixed images displaying incorrectly</li>
    <li>Fixed filtering so you could only select one filter type if wanted, not having to pick a filter for both categories.</li></ol>
<br>

### KNOWN BUGS
<ol><li><strong>Distance from the user</strong> does not properly update at times unless the browser is refreshed (unknown cause).</li>
  <li><strong>Manage Payment:</strong> the client has their own secure functionality for this, so they will be connecting it with the app.</li>
  <li><strong>Push Notifications</strong>: Must be deployed to an emulator to test, which we did not have.</li></ol>
<br>

