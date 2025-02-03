import Salary from "../models/Salary.js";
import Employee from "../models/employee.js";

const addSalary = async (req, res) => {
  try {
    const { employee, basicSalary, allowance, deduction, payDate } = req.body;

    // Validate required fields
    if (!employee || !basicSalary || !allowance || !deduction || !payDate) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowance) - parseInt(deduction);
    if (isNaN(totalSalary)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid salary calculation" });
    }

    const newSalary = new Salary({
      employeeId: employee,
      basicSalary,
      allowance,
      deduction,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding salary:", error);
    return res
      .status(500)
      .json({ success: false, error: "Salary add server error" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );

    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
      console.log(salary);
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Salary get server error" });
  }
};

export { addSalary, getSalary };
