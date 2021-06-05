import { connect } from 'mongoose';
import config from '.';

export const initConn = async () => {
  try {
    await connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (e) {
    // logger.err(e)
    process.exit(1);
  }
};
