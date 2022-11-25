//IIFE to confirm before delete a data
(function()
{

    function Start()
    {
        console.log("App Started!");

       $("a.delete").on("click", function(event)
       {
            if(!confirm("Are you sure to delete this contact?"))
            {
                event.preventDefault();
                location.href = "/contact-list";
            }
       });
    }

    window.addEventListener("load", Start);

})();