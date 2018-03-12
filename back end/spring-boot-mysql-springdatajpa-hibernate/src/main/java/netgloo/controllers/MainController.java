package netgloo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
  
  @CrossOrigin(origins = "http://localhost:9000")
  @RequestMapping("/")
  @ResponseBody
  public String index() {
    return "Proudly handcrafted by " +
        "<a href='http://netgloo.com/en'>Netgloo</a> :)";
  }

}