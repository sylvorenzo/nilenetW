import React,{ useEffect, useState} from 'react';
import Chart from 'react-google-charts';
import fire from './fire';
import ml5 from 'ml5';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import combination from '../assets/content.png';

const MyBusinessScreen = ()=>{
    // constants created to store user input
    const [values, setValues] = useState({
        numberofEmployees:'',
        numberofMilestones: '',
        managementExperience: '',
        TotalcapitalAmount: '',
        financialBackground:'',
        relationships:'',
        numberOfCompetitors:'',
        open: false,
    })
    // drawer handler variables
    var [drawerOpen, setDrawerOpen] = useState(false);
    var [drawerClasses, setDrawerClasses] = useState('side-drawer');
    //arrays that would store data from database.
    var [datas, setDatas] = useState([]);
    var [results, setResults] = useState([]);
    var [items, setItems] = useState([]);

    const [tag, setTag] = useState([]);
    const [datapoints, setDatapoints] = useState([]);
    var [charts, setCharts] = useState([]);
    const [sectorOfBusiness,setSectorOfBusiness] = useState('');

    //handles input change
    function handleChange(event){
       
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value
        })
    }
    // generate report function
   function initializeBrain(){
       backdropClickHandler();

       // data used to train the machine.
         var data = [
            { numberofEmployees:"150", numberofMilestones:"10", managementExperience:"10", TotalcapitalAmount:"500000", financialBackground:"yes", relationships:"10", numberOfCompetitors:"1", label:'Startup success'},
            { numberofEmployees:"140", numberofMilestones:"9", managementExperience:"9", TotalcapitalAmount:"450000", financialBackground:"yes", relationships:"9", numberOfCompetitors:"2", label:'Startup success'},
            { numberofEmployees:"130", numberofMilestones:"8", managementExperience:"8", TotalcapitalAmount:"400000", financialBackground:"yes", relationships:"8", numberOfCompetitors:"3", label:'Startup success'},
            { numberofEmployees:"120", numberofMilestones:"7", managementExperience:"7", TotalcapitalAmount:"350000", financialBackground:"yes", relationships:"7", numberOfCompetitors:"4", label:'Startup success'},
            { numberofEmployees:"110", numberofMilestones:"6", managementExperience:"6", TotalcapitalAmount:"300000", financialBackground:"yes", relationships:"6", numberOfCompetitors:"5", label:'Startup success'},
            { numberofEmployees:"100", numberofMilestones:"5", managementExperience:"5", TotalcapitalAmount:"250000", financialBackground:"yes", relationships:"5", numberOfCompetitors:"6", label:'Startup moderate'},
            { numberofEmployees:"90", numberofMilestones:"5", managementExperience:"4", TotalcapitalAmount:"200000", financialBackground:"yes", relationships:"4", numberOfCompetitors:"7", label:'Startup moderate'},
            { numberofEmployees:"80", numberofMilestones:"5", managementExperience:"3", TotalcapitalAmount:"150000", financialBackground:"yes", relationships:"3", numberOfCompetitors:"8", label:'Startup moderate'},
            { numberofEmployees:"70", numberofMilestones:"5", managementExperience:"2", TotalcapitalAmount:"100000", financialBackground:"yes", relationships:"3", numberOfCompetitors:"9", label:'Startup moderate'},
            { numberofEmployees:"40", numberofMilestones:"5", managementExperience:"2", TotalcapitalAmount:"95000", financialBackground:"yes", relationships:"3", numberOfCompetitors:"10", label:'Startup moderate'},
            { numberofEmployees:"30", numberofMilestones:"4", managementExperience:"1", TotalcapitalAmount:"90000", financialBackground:"no", relationships:"2", numberOfCompetitors:"11", label:'Startup at risk'},
            { numberofEmployees:"20", numberofMilestones:"3", managementExperience:"1", TotalcapitalAmount:"85000", financialBackground:"no", relationships:"1", numberOfCompetitors:"11", label:'Startup at risk'},
            { numberofEmployees:"15", numberofMilestones:"2", managementExperience:"1", TotalcapitalAmount:"80000", financialBackground:"no", relationships:"1", numberOfCompetitors:"11", label:'Startup at risk'},
            { numberofEmployees:"10", numberofMilestones:"1", managementExperience:"0", TotalcapitalAmount:"75000", financialBackground:"no", relationships:"1", numberOfCompetitors:"11", label:'Startup at risk'},
            { numberofEmployees:"9", numberofMilestones:"0", managementExperience:"0", TotalcapitalAmount:"70000", financialBackground:"no", relationships:"0", numberOfCompetitors:"11", label:'Startup at risk'},
            { numberofEmployees:"8", numberofMilestones:"0", managementExperience:"0", TotalcapitalAmount:"65000", financialBackground:"no", relationships:"0", numberOfCompetitors:"11", label:'Startup at risk'},

          ];

          // machine options
        const options ={
            task: 'classification',
            debug: false,
          };
          // create new neural network
         const model = ml5.neuralNetwork(options);

         //loop true data and store into inputs constant.
        data.forEach(item => {
             const inputs = {
              numberofEmployees: item.numberofEmployees, 
              numberofMilestones: item.numberofMilestones,
              managementExperience:item.managementExperience,
              TotalcapitalAmount: item.TotalcapitalAmount,
              financialBackground: item.financialBackground,
              relationships: item.relationships,
              numberOfCompetitors: item.numberOfCompetitors,
            };
            // the output would be the label
             const output = {
              label: item.label
            };
          
            //add data to the neural network
             model.addData( inputs,  output);
          });

          // normalize your data;
        model.normalizeData();
            const trainingOptions = {
                epochs: 100,
                batchSize: 50,
                }
                
        
                // use the trained model
                function finishedTraining(){
                classify();
                };

            model.train(trainingOptions, finishedTraining);

            console.log("training model was clicked");

            function classify(){
                
               // user input is mapped and stored into input2
                datas.map(item =>{
                 const input2 =  { 
                 numberofEmployees:values.numberofEmployees, 
                 numberofMilestones:values.numberofMilestones, 
                 managementExperience:values.managementExperience, 
                 TotalcapitalAmount:values.TotalcapitalAmount, 
                 financialBackground:values.financialBackground, 
                 relationships: values.relationships, 
                 numberOfCompetitors:values.numberOfCompetitors,
                }
                    // classifies the input
                    model.classify(input2, handleResults);
                })
                
                }
        
                //  define a function to handle the results of your classification
                function handleResults(error, result) {
                    if(error){
                    console.error(error);
                    return;
                    }
                
                    setResults(results = result);
                    const db = fire.database();
                    const current = fire.auth().currentUser;

                    // stores results in the backend 
                    db.ref(`charts/${current.uid}`).set({
                        tag1: results[0].label,
                        tag2: results[1].label,
                        tag3: results[2].label,
                        point1: results[0].confidence,
                        point2: results[1].confidence,
                        point3: results[2].confidence,
                        sector: sectorOfBusiness,
                        
                    }).then(console.log('success'));
                }        
    }
  

 useEffect(()=>{

    const db = fire.database();
    const current = fire.auth().currentUser;
    // gets stats data from database
    db.ref(`stats/${current.uid}`).on('value',snapshot=>{
        if(snapshot.exists()){
            let Items = snapshot.val();
            let newItems = [];
            for(let x = 0; x< 1; x++){
             
                  newItems.push({
                      
                     
                      numberofEmployees: Items.numberofEmployees,
                      numberofMilestones: Items.numberofMilestones,
                      managementExperience: Items.managementExperience,
                      relationships: Items.relationships,
                      TotalcapitalAmount: Items.TotalcapitalAmount,
                      financialBackground: Items.financialBackground,
                      numberOfCompetitors: Items.numberOfCompetitors,
                  });
          
            }
            setDatas(datas = newItems);
    
      
        }
       
    });
    // gets current user data from database
    fire.database().ref(`users/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
        console.log(snapshot.val());
        setSectorOfBusiness(snapshot.val().sector);
        console.log('sector: ', sectorOfBusiness);
        let Items = snapshot.val();
       let newItems = [];
       for(let x = 0; x< 1; x++){
        
             newItems.push({
                 companyName: Items.companyName,
                 companyDescription: Items.companyDescription, 
                 

                
             });
     
       }


        setItems(items = newItems);

    });
   
// gets chart data from database.
    db.ref(`charts/${current.uid}`).on('value', snapshot=>{
        if(snapshot.exists()){
            console.log(snapshot.val());
            let chartpoints = snapshot.val();
            let newpoints = [];
            for(let x = 0; x < 1; x++){
                newpoints.push({
    
                    tag1: chartpoints.tag1,
                    tag2: chartpoints.tag2,
                    tag3: chartpoints.tag3,
                    point1: chartpoints.point1,
                    point2: chartpoints.point2,
                    point3: chartpoints.point3
    
                })
            }
            setCharts(charts = newpoints);
    
       
            var labels = [];
            var pointers = [];
        
        
                labels.push(charts[0].tag1,charts[0].tag2, charts[0].tag3);
                pointers.push(charts[0].point1, charts[0].point2, charts[0].point3);
                setTag(labels);
                setDatapoints(pointers);
                
                console.log(tag);
                console.log(datapoints);
        }



    });
    

 },[]);


// handles side drawer functionality
 const drawerToggleClickHandler = () => {
     setDrawerOpen(drawerOpen = !drawerOpen);
     setDrawerClasses(drawerClasses = 'side-drawer open');
 }
// closes side drawer
 function backdropClickHandler(){
    setDrawerOpen(drawerOpen = false);
    setDrawerClasses(drawerClasses = 'side-drawer');
}

        return(

        <div style={{backgroundColor:'white',paddingTop:'10px'}} className="statistics">
            <img src={combination} width={1200} height={720}  style={{pointerEvents:'none', position:'absolute',}} className="stats-image"/>

        <div show ={drawerOpen} className={drawerClasses}>
            <div className="profileView-TopSection">
                <div className="profileView-back">
                    <h2 className="profileView-icon" onClick={backdropClickHandler}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
                    </h2>
                </div>
            </div>

        <div className="business-cards">
            <h2>How many people does your organisation employ?</h2>
                <input 
                    type='text' 
                    name="numberofEmployees" 
                    className="business-input"
                    value={values.numberofEmployees}
                    onChange={handleChange}
                />                                       
        </div>
        <div className="business-cards">
            <h2>Number of Milestones?</h2>
            <input 
                type='text' 
                name="numberofMilestones" 
                className="business-input"
                value={values.numberofMilestones}
                onChange={handleChange}
            />                  
        </div>
        <div className="business-cards">
            <h2>Amount of management Experience?</h2>
            <input 
                type='text' 
                name="managementExperience" 
                className="business-input"
                value={values.managementExperience}
                onChange={handleChange}
            />
        </div>
        <div className="business-cards">
            <h2>Total Capital amount?</h2>
            <input type='text' 
            name="TotalcapitalAmount" 
            className="business-input"
            value={values.TotalcapitalAmount}
            onChange={handleChange}
            />
        </div>
        <div className="business-cards">
            <h2>Do You Have A Financial Background?</h2>
            <select
            type="text"
            name="financialBackground"
            className="business-input"
            value={values.financialBackground}
            onChange={handleChange}
            >
                <option value=''> Select Value</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
            </select>
            
        </div>
        <div className="business-cards">
            <h2>Number of Competitors?</h2>
            <input type='text' 
                    name="numberOfCompetitors" 
                    className="business-input"
                    value={values.numberOfCompetitors}
                    onChange={handleChange}
            />                            
        </div>
        <div className="business-cards">
            <h2>How many relationships have you formed within your industry?</h2>
            <input 
                type='text' 
                name="relationships" 
                className="business-input"
                value={values.relationships}
                onChange={handleChange}
                />
        </div>
     
            <input type="submit" focus value="Generate Report" onClick={initializeBrain} className="business-btn" />

        <div className="business-lastcards">

        </div>
    
        </div>  
        
                <div className="business-chart" toggle={drawerToggleClickHandler}>
                    <Chart
                        chartType="PieChart"
                        width={300}
                        height={300}
                        data={[["labels","percentages"],
                            [tag[0]|| 'Start Up Success',datapoints[0]|| 0],
                            [tag[1]|| 'Start Up Moderate', datapoints[1]|| 0],
                            [tag[2]|| 'Start Up At Risk', datapoints[2]|| 0]
                        ]}
                          options={{title: 'Overview of Business'}}
                    />
                </div>
               <div className="business-content" style={{position:'relative', backgroundColor:'transparent', marginTop:'20px'}}>
                  <h1>Welcome to My Statistics</h1>
                   <p>My Statistics is a feature where we use machine learning to predict the 
                       success of your start up and the measures one should take when your start Up 
                       is in danger
                   </p>
                   <input type="submit" value="Generate Report" onClick={drawerToggleClickHandler} className="terms-btn"/>
                   
               </div>
               <div className="company-content" style={{position:'relative', backgroundColor:'transparent'}}>
                   {items.map(item=>{
                       return(
                        <div>
                            <h2>{item.companyName} </h2>
                            <p>{item.companyDescription}</p>
                        </div>

                       )
                   })}


               </div>
            </div>
        )
}
export default MyBusinessScreen;