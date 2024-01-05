function formatTime(time) {
    //input should be in string format military time
    //ex)
      // input: "16:00" //corresponds to 4:00 PM
      // output: "2pm"
      if (time.length !== 5 || typeof time !== 'string') {
        console.log('error in formatTime, expected string type with 5 characters, received time:'+ time);
        return 'N/A';
      }

      var result = '';
      const hour =  parseInt(time.substr(0, 2));
      const minute = parseInt(time.substr(3, 3));
      const timeCode = hour >= 12 ? 'PM' : 'AM';

      if (hour > 12) {
        result += String(hour - 12);
      } else {
        result += String(hour);
      }

      if (minute > 0) {
        result += time.substr(2, 4); //ex) adds ":30"
      }

      result += timeCode;

      return result;
}

export default formatTime;