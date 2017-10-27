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
We can do it this way :
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







```es6
export default () => {
  const store = Store.create({})

  const dispatch = (action, tree) => {
    const { fullpath, ended, args } = action

    if (fullpath === '/auth/login' && ended) {
      tree.ui.router.goToList()
    } else if (fullpath === '/ui/workflow/setSelected' && args.length && args[0].code !== 'search') {
      tree.prospects.setFulltext('')
    } else if (fullpath === '/prospects/setFulltext') {
      if (args.length && args[0] !== '') {
        let step = tree.ui.workflow.steps.find(s => s.code === 'search')
        if (!step) step = tree.ui.workflow.addStep({ code: 'search', name: 'Rechercher', volatile: true })
        tree.ui.workflow.setSelected(step)
      }
    } else if (fullpath === '/prospects/edit/remove' && ended) {
      tree.prospects.removeById(tree.prospects.edit.prospect.id)
      tree.ui.router.goToList()
    } else if (fullpath === '/auth/logout') {
      tree.ui.router.goToAuthentication()
    } else if (ended && (fullpath.match(/\/prospects\/data\/.*\/save/) || ['/prospects/load', '/prospects/create'].includes(fullpath))) {
      tree.ui.workflow.steps.forEach((step) => {
        step.setNumber(tree.prospects.data.filter(p => p.status === step.code).length)
      })
    } else if (fullpath === '/ui/router/go' && args.length && args[0] !== 'authentication') {
      if (!tree.auth.logged) {
        tree.ui.router.goToAuthentication()
      }
    }
  }
  ```


```es6
const dispatch = (action, tree) => [
    take.ended('/auth/login', () => { tree.ui.router.goToList() }),

    take(
      ({ fullpath, args }) => fullpath === '/ui/workflow/setSelected' && args.length && args[0].code !== 'search',
      () => { tree.prospects.setFulltext('') },
    ),

    take(
      ({ fullpath, args }) => fullpath === '/prospects/setFulltext' && args.length && args[0] !== '',
      () => {
        let step = tree.ui.workflow.steps.find(s => s.code === 'search')
        if (!step) step = tree.ui.workflow.addStep({ code: 'search', name: 'Rechercher', volatile: true })
        tree.ui.workflow.setSelected(step)
      },
    ),

    take.ended('/prospects/edit/remove', () => {
      tree.prospects.removeById(tree.prospects.edit.prospect.id)
      tree.ui.router.goToList()
    }),

    take('/auth/logout', () => { tree.ui.router.goToAuthentication() }),

    take.ended(
      ({ fullpath }) => fullpath.match(/\/prospects\/data\/.*\/save/) || ['/prospects/load', '/prospects/create'].includes(fullpath),
      () => {
        tree.ui.workflow.steps.forEach((step) => {
          step.setNumber(tree.prospects.data.filter(p => p.status === step.code).length)
        })
      },
    ),

    take(
      ({ fullpath, args }) => fullpath === '/ui/router/go' && args.length && args[0] !== 'authentication',
      () => {
        if (!tree.auth.logged) {
          tree.ui.router.goToAuthentication()
        }
      },
    ),
  ]
```

```es6
const dispatch = [
    take.ended('/auth/login', (action, tree) => { tree.ui.router.goToList() }),

    take(
      ({ fullpath, args }) => fullpath === '/ui/workflow/setSelected' && args.length && args[0].code !== 'search',
      (action, tree) => { tree.prospects.setFulltext('') },
    ),

    take(
      ({ fullpath, args }) => fullpath === '/prospects/setFulltext' && args.length && args[0] !== '',
      (action, tree) => {
        let step = tree.ui.workflow.steps.find(s => s.code === 'search')
        if (!step) step = tree.ui.workflow.addStep({ code: 'search', name: 'Rechercher', volatile: true })
        tree.ui.workflow.setSelected(step)
      },
    ),

    take.ended('/prospects/edit/remove', (action, tree) => {
      tree.prospects.removeById(tree.prospects.edit.prospect.id)
      tree.ui.router.goToList()
    }),

    take('/auth/logout', (action, tree) => { tree.ui.router.goToAuthentication() }),

    take.ended(
      ({ fullpath }) => fullpath.match(/\/prospects\/data\/.*\/save/) || ['/prospects/load', '/prospects/create'].includes(fullpath),
      (action, tree) => {
        tree.ui.workflow.steps.forEach((step) => {
          step.setNumber(tree.prospects.data.filter(p => p.status === step.code).length)
        })
      },
    ),

    take(
      ({ fullpath, args }) => fullpath === '/ui/router/go' && args.length && args[0] !== 'authentication',
      (action, tree) => {
        if (!tree.auth.logged) {
          tree.ui.router.goToAuthentication()
        }
      },
    ),
  ]
  ```
