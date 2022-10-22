
export class User {
    constructor(sender_id) {
        this.sender_id = sender_id;
        this.name = "";
        this.subject = "";
        this.message = "";
        this.study_group = "";
        this.year = "";
        this.phone_number = "";
        this.mail = "";
        this.step = 0;
    }
  
    step_promotion() {
        this.step += 1;
    }
    
    get_step() 
    {
        return this.step;
    }

    set_by_step(text)
    {
        switch (this.step) {
        case 1:
            this.name = text;
            break;
        case 2:
            this.subject = text;
            break;
        case 3:
            this.study_group= text;
            break;
        case 4:
            this.year = text;
            break;
        case 5:
            this.message = text;
            break;
        case 6:
            this.mail = text;
            break;
        case 7:
            this.phone_number = text;
            break;
        default:
            break;
        }
    }

    to_string()
    {
        return `name = ${this.name} , subject = ${this.subject} , rec=  ${this.recived} , mail=  ${this.mail}`;
    }

    get_query(timestamp)
    {
        let vars = {
            "myItemName" : this.name,
            "columnVals" : JSON.stringify({
              "date4" : {"date" : Date(timestamp).toLocaleDateString('en-GB')},
              "text" : this.sender_id,
              "text2" : this.subject,
              "text4" : this.study_group,
              "text8" : this.year,
              "long_text" : this.message,
              "email" : {email : this.mail, text: this.mail},
              "phone" : {phone : this.phone_number, countryShortName: 'IL'}
            })
          };
        return vars;
    }
}
