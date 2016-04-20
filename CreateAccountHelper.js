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
                    console.log("Could not retreive the Form Section records from server");
                }                
            })
            
            $A.enqueueAction(action);  
        }
        catch(err){
            console.log("error message : "+err.message);
        }   
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
                        console.log("Account has been created in server : "+response.getReturnValue());
                    }
                    else{
                        console.log("Failed : Account creation has been failed in server");
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
    }
})
