const Category = require("../models/Category")
const Course = require("../models/Courses")

// create Category
exports.createCategory = async (req, res) => {
    try {
        // fetching data from req body
        const { name, description } = req.body;

        // validation
        // if (!name || !description) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All Fields Are require"
        //     })
        // }

        // checks if duplicate category is present or not
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category with this name already exists"
            })
        }

        // create entry in db
        const categoryDetails = await Category.create({
            name: name,
            description: description
        });
        // console.log(categoryDetails)

        // send response
        res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data: categoryDetails
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
}

// get all category 
exports.showAllCategory = async (req, res) => {
    try {
        // collect all category
        const allCategories = await Category.find({}).populate("courses")  
        res.status(200).json({
            success: true,
            message: "All Category fetched Successfully",
            data: allCategories
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            // message: "Something went wrong",
            error: err.message
        })
    }
}

// category page details
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body
        // get Courses for the specified category
        // console.log("category: ", categoryId)

        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec()
        // console.log(selectedCategory)

        // Handle the case when category is not found
        if (!selectedCategory) {
            // console.log("Category not found.")
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        // Handle the case when there are no coures
        if (selectedCategory.courses.length === 0) {
            // console.log("No Courses found for the selected category")
            return res.status(404).json({
                success: false,
                message: "No Courses found for the selected Category"
            })
        }

        // const selectedCourses = selectedCategory.courses;

        // Get Courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        }).populate({path:"courses",match:{status:"Published"},populate:([{path:"instructor"},{path:"ratingAndReviews"}])});

        let differentCategory = []
        for (const category of categoriesExceptSelected){
            differentCategory.push(...category.courses)
        }

        // get top selling courses across all categoires
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor"
                }
            })
            .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCategory = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        res.status(200).json({
            data: {
                selectedCategory: selectedCategory,
                differentCategory: differentCategory,
                mostSellingCategory: mostSellingCategory,
            },
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

// add course to cateogry
exports.addCourseToCategory = async (req, res) => {

    const { courseId, categoryId } = req.body;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        if (category.courses.includes(courseId)) {
            return re.status(200).json({
                success: true,
                message: "Course Already exists in the category"
            })
        }
        category.courses.push(courseId)
        await category.save();
        return res.status(200).json({
            success: true,
            message: "Course Added to Category successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

exports.deleteCategory = async(req,res)=>{
    try{
        const {categoryId} = req.body;
        // Find the category by ID
        const category = await Category.findById(categoryId).populate("courses");

        // Check if the category exists
        if (!category) {
            return res.status(404).json({
            success: false,
            message: "Category not found",
            });
        }

        // Check if the category contains any courses
        if (category.courses.length > 0) {
            for (const course of category.courses) {
            // Check if the course has enrolled students
            if (course.enrolledStudents && course.enrolledStudents.length > 0) {
                return res.status(400).json({
                success: false,
                message: "Cannot delete category. Some courses have enrolled students.",
                });
            }

            // Delete the course
            await Course.findByIdAndDelete(course._id);
            }
        }

        // Delete the category
        await Category.findByIdAndDelete(categoryId);

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Category and its courses deleted successfully",
        });
    }catch(err){
        return res.status(400).json({
            success:false,
            message : err.message || "Error while deleting category"
        })
    }
}