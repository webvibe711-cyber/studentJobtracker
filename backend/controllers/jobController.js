const Job = require('../models/Job');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const getJobs = asyncHandler(async (req, res) => {
  const { search, category, location } = req.query;
  const filters = {};

  if (search) {
    filters.$or = [
      { jobTitle: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (category) {
    filters.category = category;
  }

  if (location) {
    filters.location = location;
  }

  const jobs = await Job.find(filters).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

const getJobById = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    const error = new Error('Job not found');
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);

  res.status(201).json({
    success: true,
    data: job,
  });
});

const updateJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    const error = new Error('Job not found');
    error.statusCode = 404;
    return next(error);
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: updatedJob,
  });
});

const deleteJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    const error = new Error('Job not found');
    error.statusCode = 404;
    return next(error);
  }

  await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Job deleted successfully',
  });
});

const getJobCount = asyncHandler(async (req, res) => {
  const count = await Job.countDocuments();

  res.status(200).json({
    count,
  });
});

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobCount,
};
