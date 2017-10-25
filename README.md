# trampss-mst-onaction

Listen to mobx-state-tree action and react to them !
> Make your mobx-state-tree store a real tree and not graph

[![CircleCI](https://circleci.com/gh/Trampss/trampss-mst-onaction.svg?style=shield)](https://circleci.com/gh/Trampss/trampss-mst-onaction) [![Coverage Status](https://coveralls.io/repos/github/Trampss/trampss-mst-onaction/badge.svg?branch=master)](https://coveralls.io/github/Trampss/trampss-mst-onaction?branch=master) [![NPM Version](https://badge.fury.io/js/trampss-mst-onaction.svg)](https://www.npmjs.com/package/trampss-mst-onaction)
[![Size](http://img.badgesize.io/Trampss/trampss-mst-onaction/master/index.js.svg)]()

## Contents
 - [Purpose](#purpose)
 - [Why ?](#why)
 - [Installation](#installation)
 - [API](#api)

## Purpose
TODO

## Why
TODO, [you can see this issue](https://github.com/mobxjs/mobx-state-tree/issues/486).

From graph to a tree:
<center>
  <img width=400 src="https://user-images.githubusercontent.com/17828231/31930688-e625701e-b8a0-11e7-93d6-2afade1d6f4a.png" />
  &nbsp;&nbsp;
  <img width=420 src="https://user-images.githubusercontent.com/17828231/31930679-dec505a0-b8a0-11e7-814e-a04a68ffb0c1.png" />
</center>

## Installation
 - `yarn add trampss-mst-onaction`
 - `npm i trampss-mst-onaction`

## API
TODO

Example: we want a login action to trigger a router action.
We can do this this way :
```es6
import onAction from 'trampss-mst-onaction'
import Store from './your-store-model'

// instanciate the store
const store = Store.create({})

// the actions to trigger
const dispatch = (action, tree) => {
  const { fullpath, ended } = action

  if (fullpath === '/auth/login' && ended) {
    tree.ui.router.goToList()
  }
}

// attach the onAction middleware from trampss-mst-onaction
addMiddleware(store, onAction(dispatch))
```
