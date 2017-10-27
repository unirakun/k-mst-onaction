# trampss-mst-onaction

Listen to [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) actions and react to them !
> Make your mobx-state-tree store a real tree and not graph

[![CircleCI](https://circleci.com/gh/Trampss/trampss-mst-onaction.svg?style=shield)](https://circleci.com/gh/Trampss/trampss-mst-onaction) [![Coverage Status](https://coveralls.io/repos/github/Trampss/trampss-mst-onaction/badge.svg?branch=master)](https://coveralls.io/github/Trampss/trampss-mst-onaction?branch=master) [![NPM Version](https://badge.fury.io/js/trampss-mst-onaction.svg)](https://www.npmjs.com/package/trampss-mst-onaction)
[![Size](http://img.badgesize.io/Trampss/trampss-mst-onaction/master/index.js.svg)]()

## Contents
 - [Purpose](#purpose)
 - [Why ?](#why)
 - [Installation](#installation)
 - [API](#api)
 - [Examples](#examples)

## Purpose
The main purpose is to get rid of store interdependencies and to be more into a reactive way of coding.

## Why
[you can see this issue](https://github.com/mobxjs/mobx-state-tree/issues/486).

What we want it to pass from an actions dependencies graph to a tree :
<center>
  <img width=400 src="https://user-images.githubusercontent.com/17828231/31930688-e625701e-b8a0-11e7-93d6-2afade1d6f4a.png" />
  &nbsp;&nbsp;
  <img width=420 src="https://user-images.githubusercontent.com/17828231/31930679-dec505a0-b8a0-11e7-814e-a04a68ffb0c1.png" />
</center>

## Installation
 - `yarn add trampss-mst-onaction`
 - `npm i trampss-mst-onaction`

## API
### First try
  1. Import the middleware from **trampss-mst-onaction** : `import onAction from 'trampss-mst-onaction'`
  1. Write your reaction, the easiest way is to write it as a function :
  ```es6
  const dispatch = (action, tree) => {
    const { fullpath, ended } = action

    if (fullpath === '/auth/login' && ended) {
      tree.ui.router.goToList()
    }
  }
  ```
  1. Connect the middleware to your root store with `addMiddleware` from [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) : `addMiddleware(yourStore, onAction(dispatch))`
  1. Voila !

### Middleware API
As you see on the [First try](#firsttry) what you have to do is to give a `dispatch` function to the `onAction` middleware.

The `dispatch` function can be from two types :
 - **an array**, in the case, each function of the array will be called
 - **a function**, in this case the function will be called
   * if the `dispatch` function returns an array, then the middleware will iterate over the array and call each functions that compose it

You can use the `take` helper to avoid dealing with the API and have a cleaner code.

From [First try](#firsttry) example code with `take` helper :
```es6
import { addMiddleware } from 'mobx-state-tree'
import onAction from 'trampss-mst-onaction'
import Store from './your-store-model'

// instanciate the store
const store = Store.create({})

// the actions to trigger
const dispatch = (action, tree) => [
  take.ended('/auth/login', () => { tree.ui.router.goToList() })
]

// attach the onAction middleware from trampss-mst-onaction
addMiddleware(store, onAction(dispatch))
```
Note that :
  - dispatch returns an array
  - we call `take.ended` which will test that the asynchronous action is ended
  - we pass the full action name (path + name) to the first parameter
  - we pass the reaction to the second one parameter

### Take API
`take` is an helper that take two arguments (`take(test, reaction)`):
 - first argument is the `test`, it can be
   * **a string :** then the fullpath equality is tested
   * **a regular expression:** then the fullpath is tested over the regular expression
   * **a function:** then the function is called and should return `true` so the reaction is called
     - the function takes two arguments, the `action` to test and the current `tree` (your store instance)
 - second argument is the `reaction`, this is **a function** that take two arguments (`reaction(action, tree)`):
   * `action` is the action that pass the test (first argument of `take`)
   * `tree` is your current store instance, so you can call action on it !

### Action API
As you can see, the `action` object is given to your `dispatch` function, and to first and second parameters of `take` helper.
This `action` owns this fields :
 - **path :** the action path from the root store
 - **name :** the action name
 - **fullpath :** `path + '/' + name`
 - **ended :** for asynchronous action **only**, it means the aynchronous action is ended

## Examples
We will write 4 ways of doing a router redirection after our login is successful :
 - `dispatch` is a function (that doesn't return an array)
 - `dispatch` is a function that returns an array
   * with a not pure `take` helper function use
   * with a pure `take` helper function use
 - `dispatch` is an array

### `dispatch` is a function (that doesn't return an array)
```es6
import { addMiddleware } from 'mobx-state-tree'
import onAction from 'trampss-mst-onaction'
import Store from './your-store-model'

const store = Store.create({})

const dispatch = (action, tree) => {
  const { fullpath, ended } = action

  if (ended && fullpath === '/auth/login') {
    tree.ui.router.goToList()
  }
}

addMiddleware(store, onAction(dispatch))
```

### `dispath` is a function that returns an array - impure take
```es6
import { addMiddleware } from 'mobx-state-tree'
import onAction, { take } from 'trampss-mst-onaction'
import Store from './your-store-model'

const store = Store.create({})

const dispatch = (action, tree) => [
  take.ended('/auth/login', () => { tree.ui.router.goToList() }),
]

addMiddleware(store, onAction(dispatch))
```

### `dispath` is a function that returns an array - **pure** take
```es6
import { addMiddleware } from 'mobx-state-tree'
import onAction, { take } from 'trampss-mst-onaction'
import Store from './your-store-model'

const store = Store.create({})

const dispatch = () => [
  take.ended('/auth/login', (action, tree) => { tree.ui.router.goToList() }),
]

addMiddleware(store, onAction(dispatch))
```

### `dispatch` is an array ️❤️
❤️ This is the recommended way of using this middleware ❤️

```es6
import { addMiddleware } from 'mobx-state-tree'
import onAction, { take } from 'trampss-mst-onaction'
import Store from './your-store-model'

const store = Store.create({})

const dispatch = [
  take.ended('/auth/login', (action, tree) => { tree.ui.router.goToList() }),
]

addMiddleware(store, onAction(dispatch))
```
