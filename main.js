
let sec=0
let qNumber=1
let dataArray = [];
let interval = null;
let submitArray =[];

$('#txt-time').val('00:00');
$('#txt-q-number').val('1/5');


class Answer{
    constructor(id,Answer,state){
        this.id = id;
        this.Answer = Answer;
        this.state = state;
    }
}
class Question{
    constructor(id,question,answer){
        this.id = id;
        this.question = question;
        this.answer = answer;
    }
}



let q1 = new Question(1,'Question 1',[new Answer(1,'Answer 1', false),new Answer(2,'Answer 2', false),new Answer(3,'Answer 3',true),new Answer(4,'Answer 4', false)]);
let q2 = new Question(2,'Question 2',[new Answer(1,'Answer 1', false),new Answer(2,'Answer 2', false),new Answer(3,'Answer 3',true),new Answer(4,'Answer 4', false)]);
let q3 = new Question(3,'Question 3',[new Answer(1,'Answer 1', false),new Answer(2,'Answer 2', false),new Answer(3,'Answer 3',true),new Answer(4,'Answer 4', false)]);
let q4 = new Question(4,'Question 4',[new Answer(1,'Answer 1', false),new Answer(2,'Answer 2', false),new Answer(3,'Answer 3',true),new Answer(4,'Answer 4', false)]);
let q5 = new Question(5,'Question 5',[new Answer(1,'Answer 1', false),new Answer(2,'Answer 2', false),new Answer(3,'Answer 3',true),new Answer(4,'Answer 4', false)]);

dataArray.push(q1,q2,q3,q4,q5);
console.log(dataArray);

const showAnswers = ()=>{

     marks=0;

    for(let x=0;x<submitArray.length;x++){
         let selectedQ = dataArray[x];
         let selectedA = submitArray[x];
         let da = selectedQ.answer.find(d=>d.id == selectedA.answer);
         
         if(da && da.state){
            marks++;
         }
    }
    $('#txt-answer').val('Marks : '+marks+'/5');
   
    
}

const verifyAnswer=(State)=>{
    clearInterval(interval);
    if(State === 'skipped'){
        submitArray.push(null);
    }else{
        let answer = $('input[name=Answer]:checked').val();
        submitArray.push({
            qNumber:qNumber,
            answer:answer,
            time:$("#txt-time").val()
        });
    }
    if(qNumber==5){
        qNumber=1;
        $('#start-button').prop('disabled',false)
        $('#txt-q-number').val('1/5');
        $('#txt-time').val('00:00');
        $('#answer-list').empty();
        $('#question').val('');
        
        showAnswers();
        return;
    }
    qNumber++;
    $('#txt-q-number').val(qNumber+'/5');
    displayQuiz()
}
const displayQuiz =()=>{
   sec=0;

   let slectedQ = dataArray[qNumber-1];
   $('#question').val(slectedQ.question);
   $('#answer-list').empty();
   $.each(slectedQ.answer,function(index,record){
    let li=$('<li>');
    let rbtn =$('<input>').attr({
        name:'Answer',
        type:'radio',
        value:record.id
    })
    let lbl=$('<label>').text(record.Answer);
    li.append(rbtn); li.append(lbl);
    $('#answer-list').append(li);
   })



    interval=setInterval(()=>{
        if(sec<10){
        $('#txt-time').val('0.0'+sec);
        }else{
        $('#txt-time').val('0.'+sec);
        }
        sec++

        if(sec==30){
            verifyAnswer('skipped');
        }
    },1000)
}

const start = ()=>{
    $('#start-button').prop('disabled',true);
    $('#txt-answer').val('Marks : ');
    submitArray=[];
    displayQuiz();
}