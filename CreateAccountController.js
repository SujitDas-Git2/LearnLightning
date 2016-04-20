({
    //This method is called during component initialization
	doInit : function(component, event, helper) {
		helper.getAccountDetails(component);
	},
    
    //Show New Account creation modal    
    showNewAccModal : function(component, event, helper) {
        component.set("v.showAccModal", true);        
    },
    
    //Hide New Account creation modal
    hideNewAccModal : function(component, event, helper) {         
        component.set("v.showAccModal", false);
    },
    
    //Create Account
    createNewAcc : function(component, event, helper) {
		helper.createNewAccHelper(component, event);
    },
    
    //This method is used to display spinner when the component is busy rendering.
    showSpinner : function (component, event, helper) {
        var spinner = component.find('spinner');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : true });
        evt.fire();    
    },
  	
    //This method is used to hide spinner when the component is done rendering
    hideSpinner : function (component, event, helper) {
        var spinner = component.find('spinner');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : false });
        evt.fire();    
    },
    
    removeNameErr : function(component){
        var nameComp = component.find("Name");
        nameComp.set("v.errors", null);
    },   
})
