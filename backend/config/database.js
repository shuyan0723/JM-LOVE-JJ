import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jm-love-jj';
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB 已连接: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ 数据库连接失败: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

