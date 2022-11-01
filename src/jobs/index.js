import Agenda from 'agenda';
import DatabaseConfig from '../config/database';

import ChargeSubscriptions from './_ChargeSubscriptions';
import RechargeSubscriptions from './_RechargeSubscriptions';

const { mongodb_url } = DatabaseConfig;

const agenda = new Agenda({ db: { address: mongodb_url } });

agenda.define(
    "CHARGE_SUBSCRIPTIONS_EXPIRING_ON_THE_DAY",
    (job) => { ChargeSubscriptions(job) }
);
agenda.define(
    "RECHARGE_SUBSCRIPTIONS",
    (job) => { RechargeSubscriptions(job) }
);

(async function () {
    await agenda.start();
    const everyMinute = "* * * * *";
    const everyDayAt9h30min = "30 9 * * *";
    await agenda.every(everyDayAt9h30min, [
        "CHARGE_SUBSCRIPTIONS_EXPIRING_ON_THE_DAY",
        "RECHARGE_SUBSCRIPTIONS"
    ]);
})();
