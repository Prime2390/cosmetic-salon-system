package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTests  extends BaseTest {

    @Test
    public void openLoginPage() {
        driver.get("http://localhost:5173/logowanie");
        String actualTitle = driver.getTitle();
        Assert.assertEquals(actualTitle, "Cosmetic Salon System");
    }
}
