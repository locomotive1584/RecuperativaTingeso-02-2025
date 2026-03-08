package com.project.bill_microservice.services;

import com.project.bill_microservice.models.Tool;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class IngressService {

    RestTemplate restTemplate;

    String toolUrl = "http://TOOL-MS/tools";

    public void setDailyCost(long toolId, int dailyCost) throws Exception {
        try {
            Tool tool = restTemplate.getForObject(toolUrl+"/"+toolId, Tool.class);
            tool.setDailyCost(dailyCost);
            restTemplate.put(toolUrl+"/", tool);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error al cambiar el costo diario");
        }
    }

    public void setDailyFine(long toolId, int dailyFine) throws Exception {
        try {
            Tool tool = restTemplate.getForObject(toolUrl+"/"+toolId, Tool.class);
            tool.setDailyFine(dailyFine);
            restTemplate.put(toolUrl+"/", tool);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error al cambiar el costo de atraso");
        }
    }

    public void setRepositionCost(long toolId, int repositionCost) throws Exception {
        try {
            Tool tool = restTemplate.getForObject(toolUrl+"/"+toolId, Tool.class);
            tool.setRepositionCost(repositionCost);
            restTemplate.put(toolUrl+"/", tool);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error al cambiar el costo de reposicion");
        }
    }
}
