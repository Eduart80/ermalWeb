// app.post('/api/bookings', (req, res) => {
//     const { date, time, fullName, phone, email, address } = req.body;
//     // Send company email
//     transporter.sendMail({
//         to: 'team@homeinspectioncompany.com',
//         subject: `New Booking - ${date} at ${time}`,
//         text: `Hello Team, ...` // Use the template above
//     });
//     res.json({ success: true });
// });