/**
 * Created by michbil on 26.04.16.
 */


import logger from 'winston';
import {db} from 'wriocommon';var dbInst = db.db;

export default class WidgetID {

    constructor () {
        this.widgets = dbInst.db.collection('titterWidgetID');
    }

    create(widgetId,userID,q) {
        var that = this;
        let invoice_data = {
            widgetId:widgetId,
            userId:userID,
            query: q
        };

        return new Promise((resolve, reject) => {
            this.widgets.insertOne(invoice_data,function(err,res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });

    }

    get(mask) {
        var that=this;

        return new Promise((resolve,reject) => {

            this.widgets.findOne(mask,function (err,data) {
                if (err) {
                    logger.error("Error while searching invoice");
                    reject(err);
                    return;
                }
                if (!data) {
                    return resolve(null);
                }
                that.invoice_id = data._id;
                resolve(data);
            });
        });
    }

}