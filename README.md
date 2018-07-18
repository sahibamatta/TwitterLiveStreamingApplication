

This Application will run via url: http://localhost:9011/TwitterLiveStreaming

Deployment Steps

1. In Terminal , open folder TwitterLiveStreamingApplication/live-streaming-app and write mvn clean install .
2. Go to apache-tomcat folder and open webapps , make a soft link of the compiled application . 
 ln -s  / live-streaming-app/target/ LiveStreamingApp.
3. Then  open folder TwitterLiveStreamingApplication/LiveStreamingData and write pm2 start server.js .
4. Then the application will run on http://localhost:9011/TwitterLiveStreaming# TwitterLiveStreamingApplication
# TwitterLiveStreamingApplication
# TwitterLiveStreamingApplication
