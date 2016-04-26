({
    //This method calls the Apex server method getAccDetails()
    //The response is stored in the List accounts
    getAccountDetails : function(component) {
        try{
            var action = component.get("c.getAccDetails");
            action.setCallback(this, function(response){
                if(component.isValid() && response.getState() === "SUCCESS"){
                    component.set("v.accounts", response.getReturnValue());
                }
                else{
                    console.log("Could not retreive the Account records from server");
                }                
            })
            
            $A.enqueueAction(action);  
        }
        catch(err){
            console.log("error message : "+err.message);
        }   
    },
    
    //Add/Edit Account Modal helpers
    showNewAccModalHelper : function(component) {
        component.set("v.showAccModal", true);        
    },
    
    hideNewAccModalHelper : function(component) {
        component.set("v.showAccModal", false);
        this.clearPreviousAccValHelper(component);
    },
    
    //It is done to ensure that when the Edit window is loaded next time the previous values are cleared
    clearPreviousAccValHelper : function(component, event, helper) {
        //Clear the previous values
        var empnewAccount = ({'sobjectType': 'Account', 'Name': '', 'AccountNumber': ''});        
        component.set("v.newAccount",empnewAccount);
        console.log("newAccount values cleared : "+JSON.stringify(component.get("v.newAccount")));
    },
    
    //This method creates Account record in server
    createNewAccHelper : function(component, event){
        try{
            var acc = component.get("v.newAccount");
            console.log("Account details passed to server "+JSON.stringify(acc));
            
            //Verify if the mandatory field values are present
            if(typeof acc.Name != "undefined" && acc.Name != ''){
                var action = component.get("c.upsertAccount");
                
                //Pass the Account record to be created
                action.setParams({
                    newAcc : acc
                });
                
                action.setCallback(this, function(response){
                    if(component.isValid() && response.getState() === "SUCCESS"){                   
                        console.log("Account has been created/edited in server : "+response.getReturnValue());
                    }
                    else{
                        console.log("Failed : Account creation/edit has been failed in server");
                    }
                    
                    //Refresh the Account table
                    this.getAccountDetails(component);
                    
                    //Close the New Account create modal.
                    component.set("v.showAccModal", false);
                })
                
                $A.enqueueAction(action);
            }        
            else{
                var NameComp = component.find("Name");
                NameComp.set("v.errors", [{message:"Please enter value"}]);
            }   
        }
        catch(err){
            console.log("error message : "+err.message);
        }
    },
    
    editAccountHelper : function(component){
        
        try{
            var accountId = event.target.dataset.index;        
            var accountList = component.get("v.accounts");
            var account;
            
            console.log("accountId : "+accountId);
            console.log("accountList : "+JSON.stringify(accountList));
            
            //Iterate over the list and find the Account record matching the Account Id
            for(var i=0; i < accountList.length; i++){
                if(accountList[i].Id == accountId){
                    account = accountList[i]
                }
            }
            console.log("Account to be edited : "+JSON.stringify(account));
            
            //Set the value in the newAccount
            component.set("v.newAccount", account);        
            console.log("newAccount : "+JSON.stringify(component.get("v.newAccount")));
            
            //Open the New/Edit Account modal
            this.showNewAccModalHelper(component,event);
        }
        catch(err){
            console.log("error message : "+err.message);
        }
    },
    
    //Delete Account Modal helpers
    showDelAccModalHelper : function(component) {
        component.set("v.showDelAccModal", true);        
    },
    
    hideDelAccModalHelper : function(component) {
        this.clearPreviousDelAccValHelper(component);
        component.set("v.showDelAccModal", false);        
    },
    
    //It is done to ensure that when the Delete window is loaded next time the previous values are cleared
    clearPreviousDelAccValHelper : function(component, event, helper) {
        //Clear the previous values
        var empdelAccount = ({'sobjectType': 'Account', 'Name': '', 'AccountNumber': ''});        
        component.set("v.delAccount",empdelAccount);
        console.log("delAccount values cleared : "+JSON.stringify(component.get("v.delAccount")));
    },
    
    populateAccValHelper : function(component, event){
        
        try{
            var accountId = event.target.dataset.index;        
            var accountList = component.get("v.accounts");
            var account;
            
            console.log("accountId : "+accountId);
            console.log("accountList : "+JSON.stringify(accountList));
            
            //Iterate over the list and find the Account record matching the Account Id
            for(var i=0; i < accountList.length; i++){
                if(accountList[i].Id == accountId){
                    account = accountList[i]
                }
            }
            console.log("Account to be edited : "+JSON.stringify(account));
            
            //Set the value in the delAccount
            component.set("v.delAccount", account);        
            console.log("delAccount : "+JSON.stringify(component.get("v.delAccount")));
        }
        catch(err){
            console.log("error message : "+err.message);
        }        
    },
    
    deleteAccountHelper : function(component){
        
        try{
            var delAccount = component.get("v.delAccount");
            
            if(typeof delAccount.Id != "undefined" && delAccount.Id != null){
                var action = component.get("c.delAccountServerSide");
                
                action.setParams({
                    account : delAccount
                });
                
                action.setCallback(this, function(response){
                    if(component.isValid() && response.getState() === "SUCCESS"){
                        if(response.getReturnValue() == true){
                            console.log("Account has been deleted in server");   
                        }
                        else{
                            console.log("Failed : Account could not be deleted. Please check debug logs");
                        }
                    }
                    else{
                        console.log("Exception in server: Account deletion");
                    }
                    
                    this.hideDelAccModalHelper(component);
                    
                    //Reload all the Account records
                    this.getAccountDetails(component);
                })
                
                $A.enqueueAction(action);
            }        
            else{
                console.log('Account Id is missing');
            }
        }
        catch(err){
            console.log("error message : "+err.message);
        }
    },
})
