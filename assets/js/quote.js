// Declaring the global variables

var nb_apart,           //Number of apartments
  nb_floors,            //Number of floors
  nb_basements,         //Number of basements
  nb_bus,               //Number of of distinct businesses
  nb_pkg,               //Number of parking space available
  nb_elev_deployed,     //Number of elevator cages to be deployed
  nb_sep_ten_comp,      //Number of separate tenant companies
  max_num_occ_flr,      //Maximum number of occupants per floor
  num_hours_activity,   //Number of hours of activity of the building
  num_cages,            //Number of cages
  num_elevators;        //Number of elevators

init();

function init() {
  // nb_apart = 0;
  // nb_floors = 0;
  // nb_basements = 0;
  // nb_bus = 0;
  // nb_pkg = 0;
  // nb_elev_deployed = 0;
  // nb_sep_ten_comp = 0;
  // max_num_occ_flr = 0;
  // num_hours_activity = 0;
  // num_cages = 0;
  // num_elevators = 0;

  $(document).ready(function() {
    $('div.building_type').hide();      
    $('#select_option').on('change', function () {           
        var selected = $(this).val();
        $('div.building_type').hide();
        $('#show'+selected).show();
    });
  });

  // Radio Buttons Hide/Show Unit Prices
  $(document).ready(function () {
    $(".box").hide();
    $('input[type="radio"]').click(function () {
      var inputValue = $(this).attr("value");
      var targetBox = $("." + inputValue);
      $(".box").not(targetBox).hide();
      $(targetBox).show();
    });
  });

};

// ----------------------------------------------------------------------------------------------------------------
// Function to clear values of the form

clear_Func = function() {
  
  // Restarting the Number of Elevators Required
  var numApartRes_restart = parseInt($("#numElevReq").val()); 
  numApartRes_restart = 0;
  $("#numElevReq").text(numApartRes_restart);

  // Restarting the Price of the Equipments
  var priceElev_restart = parseInt($("#priceElev").val());  
  priceElev_restart = 0;
  $("#priceElev").text(formatter.format(priceElev_restart));

  // Restarting the Estimated Cost of Installation
  var estCostInst_restart = parseInt($("#estCostInst").val());  
  estCostInst_restart = 0;
  $("#estCostInst").text(formatter.format(estCostInst_restart));

  // Restarting the Estimated Budget
  var est_Bud_restart = parseInt($("#est_Bud").val());  
  est_Bud_restart = 0;
  $("#est_Bud").text(formatter.format(est_Bud_restart));

  // Restarting the Form Type Selection
  var dropDown = document.getElementById("select_option");
  dropDown.selectedIndex = 0;

  // Restarting the radio buttons
  $('input[name="product_line"]').prop('checked', false);
};

// ----------------------------------------------------------------------------------------------------------------
// Global Variables
    
var num_Elev_Req = 0;
var pr_Elev = 0;
var price_Inst = 0;
var tot_Price = 0;

// Price for Each Product Line
const std_Price = 7565;
const prem_Price = 12345;
const excl_Price =15400;

// Fee for Each Product Line
const std_Fee= 10;
const prem_Fee = 13;
const excl_Fee = 16;


// ----------------------------------------------------------------------------------------------------------------

/** Calculating the Number of Elevators **/

// ---------------------------------------------------------------------------------------------------------------
// Residential Building Function
// ---------------------------------------------------------------------------------------------------------------

var numElevRes = function() {



    // Getting the input and storing in a variable
    var num_apart_res = parseInt($("#numApRes").val());         // Number of Apartments
    var num_fl_res = parseInt($("#numFlRes").val());          // Number of floors	    	        
    var num_base_res = parseInt($("#numBaseRes").val());          // Number of basements

    // Obtaining Average Doors per Floor
	var avg_door_flr = Math.ceil(num_apart_res/(num_fl_res - num_base_res));        	        

    // Determining the minimum of cages and elevators in a variable
    var cages = 1;
    var elevators = 1;

    // Calculating the Number of elevators required
    elevators = Math.ceil(avg_door_flr / 6);
	if (num_fl_res > 20) {
		numColumns = Math.ceil(num_fl_res / 20);
		elevators = elevators * numColumns;
    }
    // Putting the result in a variable to do the calculation  
    $("#numElevReq").text(elevators);
    num_Elev_Req = elevators;
}

// ---------------------------------------------------------------------------------------------------------------
// Commercial Building Function
// ---------------------------------------------------------------------------------------------------------------

var numElevCom = function () {
    
    // Getting the input and storing in a variable
    var num_distBusCom = parseInt($("#numDistBusCom").val());     // Number of Distinct Businesses
    var num_fl_com = parseInt($("#numFlCom").val());            // Number of Floors
    var num_base_com = parseInt($("numBaseCom").val());         // Number of Basements        
    var num_park = parseInt($("#numParkCom").val());            // Number of Parking Spaces Available 	 	 	    
    var num_elev_Dep = parseInt($("#numElevDep").val());         // Number of Elevator Cages to be Deployed                    

    // Determining the minimum of cages and elevators in a variable
    var cages = 1;
    var elevators = 1;

    // Using the number of elevators to be deployed in variable and storing as a result
    elevators = num_elev_Dep;

    // Number of elevators to be deployed is equal to to the estimated number of cages
    cages = elevators;

    // Putting the result in a variable to do the calculation  
    
    $("#numElevReq").text(cages);
    num_Elev_Req = elevators;
    };


// ---------------------------------------------------------------------------------------------------------------
//  Corporate Building Function
//  ---------------------------------------------------------------------------------------------------------------   

var numElevCorp = function () { 

    // Getting the input and storing in a variable
    var num_distBusCorp = parseInt($("#numDistBusCorp").val());  // Number of Distinct Businesses
    var num_fl_corp = parseInt($("#numFlCorp").val());	         // Number of Floors
    var num_base_corp = parseInt($("#numBaseCorp").val());       // Number of Basements
    var num_park = parseInt($("#numParkCorp").val()); 	         // Number of Parking Spaces Available 
    var num_occ_corp = parseInt($("#numOccFlCorp").val()); 	     // Number of occupants per floor

    // Determining the minimum of columns and elevators in a variable
    var columns = 1;
    var elevators = 1;

    // Number of Floors Including Basement
    var num_tot_flrs = num_fl_corp - num_base_corp;

    // Number Total of Occupants
    var num_tot_occ = num_occ_corp*num_tot_flrs;
   
    // Number of Elevators Required
    var num_elev_Req = Math.ceil(num_tot_occ / 1000);

    // Number of Elevator Columns Required
    num_elevColReq = Math.ceil(num_tot_flrs / 20);

    // Number of Elevators per Column
    num_elev_per_Col = Math.ceil(num_elev_Req /num_elevColReq);
    
    // Total Number of Elevators  
    num_ElevReq = num_elev_per_Col * num_elevColReq;

    // Putting the result in a variable to do the calculation  
    $("#numElevReq").text(num_ElevReq);
    num_Elev_Req = num_ElevReq;
};

// ---------------------------------------------------------------------------------------------------------------
//  Hybrid Building Function
// ---------------------------------------------------------------------------------------------------------------

var numElevHyb = function(){

    // Getting the input and storing in a variable
    var num_distBusHyb = parseInt($("#numDistBusHyb").val());    // Number of Distinct Businesses
    var num_fl_hyb = parseInt($("#numFlHyb").val());	         // Number of Floors
    var num_base_hyb = parseInt($("#numBaseHyb").val());         // Number of Basements
    var num_park = parseInt($("#numParkHyb").val()); 	         // Number of Parking Spaces Available 
    var num_occ_hyb = parseInt($("#numOccFlHyb").val()); 	     // Number of occupants per floor
    var num_hrs_act_hyb = parseInt($('#numHrActHyb').val());        // Number of Hours of Activity

    // Determining the minimum of columns and elevators in a variable
    var columns = 1;
    var elevators = 1;

    // Number of Floors Including Basement
    var num_tot_flrs = num_fl_hyb - num_base_hyb;

    // Number Total of Occupants
    var num_tot_occ = num_occ_hyb*num_tot_flrs;
   
    // Number of Elevators Required
    var num_elev_Req = Math.ceil(num_tot_occ / 1000);

    // Number of Elevator Columns Required
    num_elevColReq = Math.ceil(num_tot_flrs / 20);

    // Number of Elevators per Column
    num_elev_per_Col = Math.ceil(num_elev_Req /num_elevColReq);
  
    // Total Number of Elevators 
    num_ElevReq = num_elev_per_Col * num_elevColReq;

    $("#numElevReq").text(num_ElevReq);
    num_Elev_Req = num_ElevReq;
};
   
// ----------------------------------------------------------------------------------------------------------------
// Formatting Numbers with the NumberFormat Constructor 
// ----------------------------------------------------------------------------------------------------------------

var formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    minimumIntegerDigits: 1
    });

// ----------------------------------------------------------------------------------------------------------------

/** Calculating the Price According to the Line Selected  **/

// ---------------------------------------------------------------------------------------------------------------
//  Standard Line
// ---------------------------------------------------------------------------------------------------------------

var std_Price_Tot = function () {

    // Calculation
    pr_Elev = num_Elev_Req * std_Price;
    price_Inst = pr_Elev * (std_Fee / 100);
    tot_Price = pr_Elev + price_Inst;
 
    // Price of the Equipments (Total)
    $("#priceElev").text(formatter.format(pr_Elev));

    // Estimated Cost of Installation
    $("#estCostInst").text(formatter.format(price_Inst));

    // Estimated Budget
    $("#est_Bud").text(formatter.format(tot_Price));

};
    
// ---------------------------------------------------------------------------------------------------------------
//  Premium Line
// ---------------------------------------------------------------------------------------------------------------   

var prem_Price_Tot = function () {

    // Calculation
    pr_Elev = num_Elev_Req * prem_Price;
    price_Inst = pr_Elev * (prem_Fee / 100);
    tot_Price = pr_Elev + price_Inst;
    
    // Price of the Equipments (Total)
    $("#priceElev").text(formatter.format(pr_Elev));

    // Estimated Cost of Installation
    $("#estCostInst").text(formatter.format(price_Inst));

    // Estimated Budget
    $("#est_Bud").text(formatter.format(tot_Price));

};
    
    
// ---------------------------------------------------------------------------------------------------------------
//  Excellium Line
// ---------------------------------------------------------------------------------------------------------------

var excl_Price_Tot = function () {

    // Calculation
    pr_Elev = num_Elev_Req * excl_Price;
    price_Inst = pr_Elev * (excl_Fee / 100);
    tot_Price = pr_Elev + price_Inst;
    
    // Price of the Equipments (Total)
    $("#priceElev").text(formatter.format(pr_Elev));

    // Estimated Cost of Installation
    $("#estCostInst").text(formatter.format(price_Inst));

    // Estimated Budget
    $("#est_Bud").text(formatter.format(tot_Price));

};
    
// ----------------------------------------------------------------------------------------------------------------

/** Calculating the Price According to the Product Selected  **/

// ---------------------------------------------------------------------------------------------------------------

var product_Line_Selected = function () {

    if ($("#std_line").is(':checked')) { 
        $("#priceElev").text(formatter.format(std_Price)); 	
        std_Price_Tot();
    }
    else if ($("#premium_line").is(':checked')) { 
        $("#priceElev").text(formatter.format(prem_Price));
        prem_Price_Tot();
    }
    else {
        $("#priceElev").text(formatter.format(excl_Price));
        excl_Price_Tot();
    }
};


