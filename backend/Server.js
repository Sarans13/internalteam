const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://SaransMishra:SaransIsALearner@thinkofit-01.u8n1jsv.mongodb.net/data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TeamMember = mongoose.model('TeamMember', {
  name: String,
  email: String,
  password: String,
  organizationId: String,
});

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, reenterPassword, organizationId } = req.body;
    
    // Basic validation
    if (!name || !email || !password || !reenterPassword || !organizationId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    if (password !== reenterPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
    
    const teamMember = new TeamMember({
      name,
      email,
      password,
      organizationId,
    });
    
    await teamMember.save();
    
    res.status(201).json({ message: 'Signup successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

app.get('/getUser/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const userData = await TeamMember.findOne({ organizationId: id });
      if (userData) {
        res.json(userData);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred.' });
    }
  });

  const PollingBooth2019Schema = new mongoose.Schema({
    pollingBoothNumber: Number,
    pollingBoothName: String,
    winnerYear: Number,
    winnerParty: String,
    marginPercentage: Number,
    margin: Number,
    totalVoters: Number,
    bjpVotes: Number,
    bjpVotePercentage: Number,
    incVotes: Number,
    incVotePercentage: Number,
    notaVotes: Number,
    thirdPartyVotes: Number,
    bjpBoothStrength: String,
    incBoothStrength: String
  });
  
  const PollingBooth2019 = mongoose.model('polling-booth-2019', PollingBooth2019Schema);
  
  // Route to fetch data from the polling-booth-2018 collection
  app.get('/polling-booth-2019', async (req, res) => {
    try {
      const data = await PollingBooth2019.find();
      res.json(data);
      console.log(data);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  const PollingBooth2018Schema = new mongoose.Schema({
    pollingBoothNumber: Number,
    pollingBoothName: String,
    winnerYear: Number,
    winnerParty: String,
    marginPercentage: Number,
    margin: Number,
    totalVoters: Number,
    bjpVotes: Number,
    bjpVotePercentage: Number,
    incVotes: Number,
    incVotePercentage: Number,
    notaVotes: Number,
    thirdPartyVotes: Number,
    bjpBoothStrength: String,
    incBoothStrength: String
  });
  
  const PollingBooth2018 = mongoose.model('polling-booth -2018', PollingBooth2018Schema);
  
  // Route to fetch data from the polling-booth-2018 collection
  app.get('/polling-booth-2018', async (req, res) => {
    try {
      const data = await PollingBooth2018.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  const VotersSchema = new mongoose.Schema({
    first_name: String,
    middle_name: String,
    last_name: String,
    age: Number,
    voter_id: String,
    state: String,
    district: String,
  });
  
  const Voters = mongoose.model('voters', VotersSchema);
  
  app.get('/voters', async (req, res) => {
    try {
      const data = await Voters.find({}, 'first_name middle_name last_name age state');
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.delete('/voters/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedData = await Voters.findByIdAndDelete(id);
      if (!deletedData) {
        return res.status(404).json({ message: 'Data not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  
  // Route to add a new voter
  app.post('/addvoters', async (req, res) => {
    const { first_name, middle_name, last_name, age, voter_id, state, district } = req.body;
  
    const newVoter = new Voters({
      first_name,
      middle_name,
      last_name,
      age,
      voter_id,
      state,
      district,
    });
  
    try {
      const savedVoter = await newVoter.save();
      res.status(201).json(savedVoter);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add voter', error: error.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
