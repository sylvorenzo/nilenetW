import React,{ useEffect, useState} from 'react';
import Chart from 'react-google-charts';
import fire from './fire';
import ml5 from 'ml5';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'

const MyBusinessScreen = ()=>{

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
    var [drawerOpen, setDrawerOpen] = useState(false);
    var [drawerClasses, setDrawerClasses] = useState('side-drawer');
    var [datas, setDatas] = useState([]);
    var [results, setResults] = useState([]);
    var [items, setItems] = useState([]);
    const [tag, setTag] = useState([]);
    const [datapoints, setDatapoints] = useState([]);
    var [charts, setCharts] = useState([]);
    var [sectorOfBusiness,setSectorOfBusiness] = useState([]);
    function handleChange(event){
       
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value
        })
    }
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
            debug: true
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
                 const input2 = {
                    numberofEmployees: item.numberofEmployees, 
                    numberofMilestones: item.numberofMilestones,
                    managementExperience:item.managementExperience,
                    TotalcapitalAmount: item.TotalcapitalAmount,
                    financialBackground: item.financialBackground,
                    relationships: item.relationships,
                    numberOfCompetitors: item.numberOfCompetitors,
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
                        sectorOfBusiness: sectorOfBusiness[0].sectorOfBusiness,
                    });
                }        
    }
  
    // stores data in database
   function handleSave(){
        const db = fire.database();
        const current = fire.auth().currentUser;
    
        //stores user input in database
        db.ref(`users/entrepreneur/${current.uid}`).set({
            id: current.uid,
            numberofEmployees: values.numberofEmployees,
            numberofMilestones: values.numberofMilestones,
            managementExperience: values.managementExperience,
            relationships: values.relationships,
            TotalcapitalAmount: values.TotalcapitalAmount,
            financialBackground: values.financialBackground,
            numberOfCompetitors: values.numberOfCompetitors,
            sectorOfBusiness: values.sectorOfBusiness,

        }).then(()=>{
            alert("Saved!");
        })

        db.ref(`users/mybusiness/${current.uid}`).set({
            id: current.uid,
            numberofEmployees: values.numberofEmployees,
            numberofMilestones: values.numberofMilestones,
            managementExperience: values.managementExperience,
            relationships: values.relationships,
            TotalcapitalAmount: values.TotalcapitalAmount,
            financialBackground: values.financialBackground,
            numberOfCompetitors: values.numberOfCompetitors,
        })

          

            
           

    }

 useEffect(()=>{

    const db = fire.database();
    const current = fire.auth().currentUser;
    db.ref(`users/entrepreneur/${current.uid}`).on('value',snapshot=>{
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
     
      console.log(datas);

    });

    fire.database().ref(`users/entrepreneurInfo/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
        console.log(snapshot.val());
        let Items = snapshot.val();
       let newItems = [];
       for(let x = 0; x< 1; x++){
        
             newItems.push({
                 companyName: Items.companyName,
                 companyDescription: Items.companyDescription
                
             });
     
       }


        setItems(items = newItems);
        console.log(items);
    });
   

    db.ref(`charts/${current.uid}`).on('value', snapshot=>{
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

        console.log(charts);
        const labels = [];
        const pointers = [];
    
    
            labels.push(charts[0].tag1,charts[0].tag2, charts[0].tag3);
            pointers.push(charts[0].point1, charts[0].point2, charts[0].point3);
            setTag(labels);
            setDatapoints(pointers);
            
            console.log(tag);
            console.log(datapoints);


    });
    console.log(charts);
    db.ref(`users/entrepreneur/${current.uid}`).on('value', snapshot=>{
        let items = snapshot.val();
        let newItems = [];
        newItems.push({
            sectorOfBusiness: items.sectorOfBusiness,
        })
        setSectorOfBusiness(sectorOfBusiness = newItems);
    })
    console.log(sectorOfBusiness);

 },[]);



 const drawerToggleClickHandler = () => {
     setDrawerOpen(drawerOpen = !drawerOpen);
     setDrawerClasses(drawerClasses = 'side-drawer open');
 }

 function backdropClickHandler(){
    setDrawerOpen(drawerOpen = false);
    setDrawerClasses(drawerClasses = 'side-drawer');
}

        return(

            <div >

        <div show ={drawerOpen} className={drawerClasses}>
            <div className="profileView-TopSection">
                <div className="profileView-back">
                    <h2 className="profileView-icon" onClick={backdropClickHandler}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
                    </h2>
                </div>
            </div>

        <div className="business-cards">
            <h1>How many people does your organisation employ?</h1>
                <input 
                    type='text' 
                    name="numberofEmployees" 
                    className="business-input"
                    value={values.numberofEmployees}
                    onChange={handleChange}
                />                                       
        </div>
        <div className="business-cards">
            <h1>Number of Milestones?</h1>
            <input 
                type='text' 
                name="numberofMilestones" 
                className="business-input"
                value={values.numberofMilestones}
                onChange={handleChange}
            />                  
        </div>
        <div className="business-cards">
            <h1>Amount of management Experience?</h1>
            <input 
                type='text' 
                name="managementExperience" 
                className="business-input"
                value={values.managementExperience}
                onChange={handleChange}
            />
        </div>
        <div className="business-cards">
            <h1>Total Capital amount?</h1>
            <input type='text' 
            name="TotalcapitalAmount" 
            className="business-input"
            value={values.TotalcapitalAmount}
            onChange={handleChange}
            />
        </div>
        <div className="business-cards">
            <h1>Financial Background?</h1>
            <input type='text' 
                    name="financialBackground" 
                    className="business-input"
                    value={values.financialBackground}
                    onChange={handleChange}
            />
        </div>
        <div className="business-cards">
            <h1>Number of Competitors?</h1>
            <input type='text' 
                    name="numberOfCompetitors" 
                    className="business-input"
                    value={values.numberOfCompetitors}
                    onChange={handleChange}
            />                            
        </div>
        <div className="business-cards">
            <h1>How many relationships have you formed within your industry?</h1>
            <input 
                type='text' 
                name="relationships" 
                className="business-input"
                value={values.relationships}
                onChange={handleChange}
                />
        </div>
        <div className="business-cards">
            <h1>Which sector is your organisation in?</h1>
            <select
                type='text' 
                name="sectorOfBusiness" 
                className="business-input"
                value={values.sectorOfBusiness}
                onChange={handleChange}
                >
                <option value = ''></option>
                <option value = 'tourism'> Tourism</option>
                <option value = 'business'>Finances and Business</option>
                <option value = 'manufacturing'>Manufacturing</option>
            </select><br/>
            <input type="submit" focus value="Save Answers" onClick={handleSave} className="business-btn" />  
            <input type="submit" focus value="Generate Report" onClick={initializeBrain} className="business-btn" />

        </div>
        <div className="business-lastcards">

        </div>
    
        </div>  
        
                <div className="business-chart" toggle={drawerToggleClickHandler}>
                    <Chart
                        chartType="PieChart"
                        width={400}
                        height={400}
                        data={[["labels","percentages"],
                            [tag[0],datapoints[0]],
                            [tag[1], datapoints[1]],
                            [tag[2], datapoints[2]]
                        ]}
                          options={{title: 'Overview of Business'}}
                    />
                </div>
               <div className="business-content">
                  <h1>Welcome to My Business</h1>
                   <p>My Business is a feature where we use machine learning to predict the 
                       success of your start up and the measures one should take when your start Up 
                       is in danger
                   </p>
                   <input type="submit" value="Generate Report" onClick={drawerToggleClickHandler} className="terms-btn"/>
                   
               </div>
               <div className="company-content">
                   {items.map(item=>{
                       return(
                        <div>
                            <h1>{item.companyName} </h1>
                            <p>{item.companyDescription}</p>
                        </div>

                       )
                   })}


               </div>
            </div>
        )
}
export default MyBusinessScreen;