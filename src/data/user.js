
export class User {
    constructor(sender_id) {
        this.sender_id = sender_id;
        this.name = "";
        this.subject = "";
        this.course = "";
        this.teacher_name = "";
        this.campus = "";
        this.message = "";
        this.study_group = "";
        this.year = "";
        this.previous_application = "";
        this.phone_number = "";
        this.sex = "";
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
            this.course = text;
            break;
        case 4:
            this.teacher_name = text;
            break;
        case 5:
            this.campus = text;
            break;
        case 6:
            this.recived = text;
            break;
        case 7:
            this.course = text;
            break;
        case 8:
            this.year = text;
            break;
        case 9:
            this.previous_application = text;
            break;
        case 10:
            this.phone_number= text;
            break;
        case 11:
            this.sex = text;
            break;
        case 12:
            this.mail = text;
            break;
        default:
            break;
        }
    }

    to_string()
    {
        return "name = ${this.name} , subject = ${this.subject} , rec=  ${this.recived} , mail=  ${this.mail}";
    }
}

/*function user1(sender_id) 
{
    this.sender_id = sender_id;
    this.name = "";
    this.subject = "";
    this.course = "";
    this.teacher_name = "";
    this.campus = "";
    this.message = "";
    this.study_group = "";
    this.year = "";
    this.previous_application = "";
    this.phone_number = "";
    this.sex = "";
    this.mail = "";
    this.step = 0;
}

function step_promotion()
{
    this.step += 1;
}

function set_by_step(text)
{
    switch (step) {
    case 1:
        this.name = text;
        break;
    case 2:
        this.subject = text;
        break;
    case 3:
        this.course = text;
        break;
    case 4:
        this.teacher_name = text;
        break;
    case 5:
        this.campus = text;
        break;
    case 6:
        this.teacher_name = text;
        break;
    case 7:
        this.course = text;
        break;
    case 8:
        this.year = text;
        break;
    case 9:
        this.previous_application = text;
        break;
    case 10:
        this.phone_number= text;
        break;
    case 11:
        this.sex = text;
        break;
    case 12:
        this.mail = text;
        put_in_json()
        break;
    default:
    // code block
    }
}
*/

/*switch (step) {
    case 0:
        messege = "מה השם שלך?";
        break;
    case 1:
        messege = "מה נושא הפנייה?";
        break;
    case 2:
        messege = "על איזה קורס מדובר?";
        break;
    case 3:
        messege = "מה שם המרצה?";
        break;
    case 4:
        messege = "באיזה קמפוס וכיתה נערכה הבחינה?";
        break;
    case 5:
        messege = "אנא כתבו את פנייתכם עכשיו";
        break;
    case 6:
        messege = "באיזה חוג?";
        break;
    case 7:
        messege = "שנה?";
        break;
    case 8:
        messege = "האם פנית לגורם מכללה בנושא?";
        break;
    case 9:
        messege = "מספר טלפון?";
        break;
    case 10:
        messege = "לשון הפנייה? כיצד תרצו שנפנה אליכם?";
        break;
    case 11:
        messege = "אימייל?";
        break;
    default:
        // code block
}*/

