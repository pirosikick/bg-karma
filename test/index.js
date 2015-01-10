'use strict';

var path = require('path');

var assert = require('power-assert');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('bg-karma', () => {
  before(() => {
    this.childOnMethod = sinon.spy();
    this.childKillMethod = sinon.spy();

    this.child = {
      on: this.childOnMethod,
      kill: this.childKillMethod
    };
    this.spawn = sinon.spy(() => this.child);

    this.karma = proxyquire('../lib/index', {
      child_process: {
        spawn: this.spawn
      }
    });

    this.options = {
      configFile: 'karma.conf.js',
      singleRun: true
    };

    this.childIndex = this.karma.start(this.options);
  });

  describe('.start', () => {

    it('calls child_process.spawn', () => {
      assert.ok(this.spawn.calledOnce);
    });

    it('executes background.js with options', () => {
      var args = this.spawn.args[0];
      var json = JSON.stringify(this.options);

      assert(args[0] === 'node');
      assert(args[1].length === 2);
      // TODO:__dirname is empty when using proxyquire
      assert(args[1][0] === '/background.js');
      assert(args[1][1] === `'${ json }'`);
      assert.deepEqual(args[2], { stdio: 'inherit' });     
    });

  });

  it('.__childs has this.child', () => {
    assert.strictEqual(this.child, this.karma.__childs[this.childIndex]);
  });

  describe('.kill', () => {
    before(() => {
      this.karma.kill(this.childIndex);
    });

    it('calls child.kill', () => {
      assert.ok(this.childKillMethod.calledOnce);
    });

    it('removes child from __childs', () => {
      assert.ok(!this.karma.__childs[this.childIndex]);
    });
  });
});
