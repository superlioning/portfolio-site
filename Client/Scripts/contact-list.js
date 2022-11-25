"use strict";
(function () {
    function Start() {
        console.log("App Started!");
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure to delete this contact?")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=contact-list.js.map