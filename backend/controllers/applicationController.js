const Application = require('../models/Application');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const getApplications = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filters = {};

  if (status) {
    filters.status = status;
  }

  const applications = await Application.find(filters).sort({ applicationDate: -1 });

  res.status(200).json({
    success: true,
    data: applications,
  });
});

const getApplicationById = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: application,
  });
});

const createApplication = asyncHandler(async (req, res) => {
  const application = await Application.create(req.body);

  res.status(201).json({
    success: true,
    data: application,
  });
});

const updateApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    return next(error);
  }

  const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: updatedApplication,
  });
});

const deleteApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    return next(error);
  }

  await Application.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Application deleted successfully',
  });
});

const getApplicationCount = asyncHandler(async (req, res) => {
  const count = await Application.countDocuments();

  res.status(200).json({
    count,
  });
});

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationCount,
};
