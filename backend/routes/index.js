const express = require("express");
const router = express.Router();

// this allows any dev to reset the CSRF token cookie
// needs to be removed from production once frontend is implimented
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        "XSRF-Token": csrfToken,
    });
});
// ...

module.exports = router;
