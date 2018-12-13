'use strict';

app.use(express.static('./public'));
app.use(express.static('./script'));
app.use(express.static('./styles'));
app.use(express.static('./pages'));
app.use(express.static('./layout'));
app.use(express.static('./searches'));
