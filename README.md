# jquery.notification

A simple and small notification plugin for jQuery.

## Demo

Check out http://garciabruno.github.com/jquery-notification/

## Installation

Include script after jQuery

    <script src="jquery.notification.js"></script>

## License

Dual licensed under the MIT or GPL Version 2 licenses.
- http://www.opensource.org/licenses/mit-license.php
- http://www.gnu.org/licenses/gpl-2.0.html

## Usage

    $.createNotification(options)

## Options

### className
A string containing one or more extra CSS classes, default none

### click
Click callback

### content
Notification content

### duration
On screen duration in milliseconds, set it to 0 for sticky, default 5000

### fadeIn
Fade in effect duration in milliseconds, default 400

### fadeOut
Fade out effect duration in milliseconds, default 400

### limit
Visible limit per board, when reached notifications wont be created, default false

### queue
If queue is active and limit is reached notifications will be shown when other hides, default false

### slideUp
Slide up effect duration in milliseconds, default 200

### horizontal
Horizontal alignment, default right

### vertical
Vertical alignment, default top

### showOnWindowFocused
The notification element will show only if the window is on focus, otherwise it will queue and show when focus is restored

### onFocusOutQueue
Callback when a notification is added to the "out of focus" queue

### appendToTitle
Append string to browser title

### restoreTitle
Titles will return to their original content when a notification is hidden

### background
background CSS property

### color
color CSS property
