
import StatsD from 'hot-shots';

const statsd = new StatsD();


const trackAPICalls = (req, res, next) => {

  const apiName = req.path; 
  statsd.increment(`api.${apiName}.calls`);

  next();
};

export default trackAPICalls;
