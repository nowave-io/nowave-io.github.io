# NOWAVE landing page v2 - Description
> A new page page of presentation

This project is based on [Fireshell](http://getfireshell.com), a front-end boilerplate working with [Grunt](http://gruntjs.com).

# Prerequisite
- npm

- Bower

```
$ npm install bower -g
```



## Install

```
$ npm install 
```

```
$ bower install 
```


## Usage

### Development mode

```
$ grunt
```

This command will launch a server on port 9000 and serve www content from the "app" folder.

### Production build

```
$ grunt build
```

Then copy the directory `app/assets` on the production server.

<!-- # Analytics

The email address is stored in several tools:

- Mixpanel : in order to send a notification on subscribe
- Mailchimp : in order to send people the weekly newsletter/selection of menus

But since it is not possible to add directly an email address into Mailchimp, we had to use an intermediate Google Forms, and then a Zapier task which add the email into Mailchimp from the Google Form. -->