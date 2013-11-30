Youtube API Plugin Mockup
======

Small javascript plugin that submits user’s actions from a youtube video player embbeded in an html page

A final user can integrate this plugin in just 3 steps:
- Add the javascript dependency to the plugin
- Embed a youtube video in a html page, enabling youtube API
- Add a javascript configuration object in the html page that contains for example the userID.

This plugin will submit an event for each of the following player action:
- play
- pause

The data sent by the plugin for each action is:
- userID
- videoID
- timecode
- action (see above)

(this data is currently just logged to the console)

[youtube API reference] (https://developers.google.com/youtube/js_api_reference)
