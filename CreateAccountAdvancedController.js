({
    //This method is called during component initialization
	doInit : function(component, event, helper) {
		helper.getAccountDetails(component);
	},
    
    //Show New Account creation modal    
    showNewAccModal : function(component, event, helper) {
        //component.set("v.showAccModal", true); 
        helper.showNewAccModalHelper(component);
    },
    
    //Hide New Account creation modal
    hideNewAccModal : function(component, event, helper) {         
        //component.set("v.showAccModal", false);
        helper.hideNewAccModalHelper(component);
    },
    
    //Create/Edit Account
    createNewAcc : function(component, event, helper) {
		    helper.createNewAccHelper(component, event);
    },
    
    editAccount : function(component, event, helper) {
		    helper.editAccountHelper(component, event);
    },
    
    //Show Delete Account modal    
    showDelAccModal : function(component, event, helper) {
        helper.populateAccValHelper(component, event);
        helper.showDelAccModalHelper(component);
    },
    
    //Hide New Account creation modal
    hideDelAccModal : function(component, event, helper) {  
        helper.hideDelAccModalHelper(component);
    },
    
    //This method is called from Yes button on Delete modal
    deleteAccount : function(component, event, helper) {
		    helper.deleteAccountHelper(component, event);
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
