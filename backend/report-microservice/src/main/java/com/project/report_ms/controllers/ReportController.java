package com.project.report_ms.controllers;

import com.project.report_ms.entities.PopularityDto;
import com.project.report_ms.entities.ValidityDto;
import com.project.report_ms.models.Client;
import com.project.report_ms.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {
    @Autowired
    ReportService reportService;


    @GetMapping("/getValidity")
    public ResponseEntity<List<ValidityDto>> getValidity() {
        return ResponseEntity.ok(reportService.getValidityOfLoans());
    }

    @GetMapping("/getValidity/Between/{date1}/{date2}")
    public ResponseEntity<List<ValidityDto>> getValidityBetween(@PathVariable("date1") LocalDate date1,@PathVariable("date2") LocalDate date2) {
        return ResponseEntity.ok(reportService.getValidityOfLoans(date1,date2));
    }

    @GetMapping("/getValidity/Before/{date}")
    public ResponseEntity<List<ValidityDto>> getValidityBefore(@PathVariable("date") LocalDate date) {
        return ResponseEntity.ok(reportService.getValidityOfLoansBefore(date));
    }

    @GetMapping("/getValidity/After/{date}")
    public ResponseEntity<List<ValidityDto>> getValidityAfter(@PathVariable("date") LocalDate date) {
        return ResponseEntity.ok(reportService.getValidityOfLoansAfter(date));
    }

    @GetMapping("/getClientsWithDelays")
    public ResponseEntity<List<Client>> getClientsWithDelays() {
        return ResponseEntity.ok(reportService.getClientsWithDelays());
    }

    @GetMapping("/getPopularTools")
    public ResponseEntity<List<PopularityDto>> getPopularTools() {
        return ResponseEntity.ok(reportService.toolRanking());
    }

    @GetMapping("/getPopularTools/Between/{date1}/{date2}")
    public ResponseEntity<List<PopularityDto>> getPopularToolsBetween(@PathVariable("date1") LocalDate date1,@PathVariable("date2") LocalDate date2) {
        return ResponseEntity.ok(reportService.toolRanking(date1,date2));
    }

    @GetMapping("/getPopularTools/Before/{date}")
    public ResponseEntity<List<PopularityDto>> getPopularToolsBefore(@PathVariable("date") LocalDate date) {
        return ResponseEntity.ok(reportService.toolRankingBefore(date));
    }

    @GetMapping("/getPopularTools/After/{date}")
    public ResponseEntity<List<PopularityDto>> getPopularToolsAfter(@PathVariable("date") LocalDate date) {
        return ResponseEntity.ok(reportService.toolRankingAfter(date));
    }
}
