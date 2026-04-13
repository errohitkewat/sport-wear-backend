const Hero = require("../models/Hero");


exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json({ hero });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateHero = async (req, res) => {
  try {
    const { image, titleLeft, titleRight } = req.body;

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero({
        image,
        titleLeft,
        titleRight,
      });
    } else {
      hero.image = image;
      hero.titleLeft = titleLeft;
      hero.titleRight = titleRight;
    }

    await hero.save();

    res.json({
      message: "Hero updated successfully",
      hero,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
