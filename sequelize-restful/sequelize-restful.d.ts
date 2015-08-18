/// <reference path="../sequelize/sequelize.d.ts" />
/// <reference path="../express/express.d.ts" />

declare module "sequelize-restful" {

    import sequelize = require('sequelize');

    import express = require('express');

    interface ISequelizeRestfulOptions {

        endpoint?: string;

        allowed?: string[];

    }

    function init(sequelize : sequelize.Sequelize, options? : ISequelizeRestfulOptions) : express.RequestHandler;

    export = init;

}